const SERVICE_UUID = "12345678-1234-1234-1234-1234567890ab";
const CHAR_UUID = "abcdefab-1234-5678-1234-abcdefabcdef";

export async function connectBLE(
  namePrefix: string,
  onData: (data: any) => void
) {
  if (!navigator.bluetooth) {
    alert("Web Bluetooth not supported");
    return;
  }

  const device = await navigator.bluetooth.requestDevice({
    filters: [{ namePrefix }],
    optionalServices: [SERVICE_UUID],
  });

  const server = await device.gatt!.connect();
  const service = await server.getPrimaryService(SERVICE_UUID);
  const characteristic = await service.getCharacteristic(CHAR_UUID);

  await characteristic.startNotifications();

  characteristic.addEventListener(
    "characteristicvaluechanged",
    (event) => {
      const value = new TextDecoder().decode(
        (event.target as BluetoothRemoteGATTCharacteristic).value
      );

      try {
        const json = JSON.parse(value);
        onData(json);
      } catch {
        console.warn("Invalid JSON:", value);
      }
    }
  );
}
