// src/hooks/useBLE.ts

const SERVICE_UUID = "12345678-1234-1234-1234-1234567890ab";
const CHAR_UUID = "abcdefab-1234-5678-1234-abcdefabcdef";

export async function connectBLE(
  namePrefix: string,
  onData: (data: any) => void,
  onDisconnect?: () => void
) {
  if (!navigator.bluetooth) {
    alert("Web Bluetooth not supported");
    return;
  }

  try {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ namePrefix }],
      optionalServices: [SERVICE_UUID],
    });

    const server = await device.gatt!.connect();
    const service = await server.getPrimaryService(SERVICE_UUID);
    const characteristic = await service.getCharacteristic(CHAR_UUID);

    await characteristic.startNotifications();

    console.log(`✅ Connected to ${namePrefix}`);

    // ===== STREAM BUFFER =====
    let buffer = "";

    characteristic.addEventListener(
      "characteristicvaluechanged",
      (event) => {
        const chunk = new TextDecoder().decode(
          (event.target as BluetoothRemoteGATTCharacteristic).value
        );

        buffer += chunk;

        let braceCount = 0;
        let jsonStart = -1;

        for (let i = 0; i < buffer.length; i++) {
          if (buffer[i] === "{") {
            if (braceCount === 0) {
              jsonStart = i;
            }
            braceCount++;
          }

          if (buffer[i] === "}") {
            braceCount--;

            if (braceCount === 0 && jsonStart !== -1) {
              const jsonString = buffer.substring(jsonStart, i + 1);

              try {
                const parsed = JSON.parse(jsonString);

                // 🔥 Debug log
                console.log("🔥 PARSED:", parsed);

                onData(parsed);
              } catch (err) {
                console.warn("⚠️ JSON parse failed:", err);
              }

              // Remove parsed JSON from buffer
              buffer = buffer.substring(i + 1);

              // Reset loop to start scanning fresh buffer
              i = -1;
              jsonStart = -1;
            }
          }
        }

        // Prevent runaway memory growth
        if (buffer.length > 1000) {
          console.warn("⚠️ Buffer overflow protection triggered");
          buffer = "";
        }
      }
    );

    // ===== DISCONNECT HANDLER =====
    device.addEventListener("gattserverdisconnected", () => {
      console.warn("⚠️ Device disconnected");
      onDisconnect?.();
    });

  } catch (error: any) {
    if (error.name === "NotFoundError") {
      console.log("User closed device picker");
      return;
    }

    console.error("🔴 Connection Error:", error);
    alert("Connection failed: " + error.message);
  }
}