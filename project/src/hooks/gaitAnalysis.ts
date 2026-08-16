export type GaitFrame = {
  timestamp: number
  leftFSR: number[]
  rightFSR: number[]
}

export interface WalkReport {
  symmetry: number
  balanceScore: number
  stepCount: number
  cadence: number
  stancePercent: number
  swingPercent: number
  stepVariability: number
  asymmetryIndex: number
  strideLength: number
  riskLevel: "Low" | "Moderate" | "High"
  riskReason: string
  leftHeelToeRatio: number
  rightHeelToeRatio: number
}

export function analyzeWalk(frames: GaitFrame[]): WalkReport {

  if (!frames || frames.length === 0) {
    return emptyReport()
  }

  let leftTotal = 0
  let rightTotal = 0
  let steps = 0

  let stanceFrames = 0
  let swingFrames = 0

  let stepFrames:number[] = []

  frames.forEach((f, index) => {

    const left = f.leftFSR.reduce((a:number,b:number)=>a+b,0)
    const right = f.rightFSR.reduce((a:number,b:number)=>a+b,0)

    leftTotal += left
    rightTotal += right

    /* -------- STANCE VS SWING -------- */

    if(left > 0.1 || right > 0.1) {
      stanceFrames++
    } else {
      swingFrames++
    }

    /* -------- STEP DETECTION -------- */

    if(left > 0.25 || right > 0.25) {
      steps++
      stepFrames.push(index)
    }

  })

  const total = leftTotal + rightTotal

  /* -------- SYMMETRY -------- */

  const symmetry =
    total > 0
      ? 100 - Math.abs(leftTotal - rightTotal) / total * 100
      : 100

  const balanceScore = Math.max(0, Math.min(100, symmetry))

  /* -------- CADENCE -------- */

  const cadence = steps  // because walk test is 60 seconds

  /* -------- STANCE / SWING -------- */

  const stancePercent = Math.round((stanceFrames / frames.length) * 100)
  const swingPercent = 100 - stancePercent

  /* -------- STEP VARIABILITY -------- */

  let stepVariability = 0

  if(stepFrames.length > 1){

    const diffs:number[] = []

    for(let i=1;i<stepFrames.length;i++){
      diffs.push(stepFrames[i]-stepFrames[i-1])
    }

    const mean = diffs.reduce((a,b)=>a+b,0)/diffs.length

    const variance = diffs.reduce((a,b)=>a+(b-mean)**2,0)/diffs.length

    const std = Math.sqrt(variance)

    stepVariability = Number((std/mean*100).toFixed(1))
  }

  /* -------- STRIDE LENGTH -------- */

  const strideLength = Number((0.7 + (cadence-90)*0.002).toFixed(2))

  /* -------- ASYMMETRY INDEX -------- */

  const asymmetryIndex =
    total > 0
      ? Math.abs(leftTotal - rightTotal) / total * 100
      : 0

  /* -------- HEEL / TOE LOAD -------- */

  const first = frames[0]

  const leftHeelToeRatio =
    first?.leftFSR?.[0] / (first?.leftFSR?.[4] || 1)

  const rightHeelToeRatio =
    first?.rightFSR?.[0] / (first?.rightFSR?.[4] || 1)

  /* -------- RISK CLASSIFICATION -------- */

  let riskLevel:"Low"|"Moderate"|"High" = "Low"
  let riskReason = "Normal gait pattern detected."

  if(symmetry < 80){
    riskLevel = "High"
    riskReason =
      "Significant asymmetry detected between left and right foot load."
  }
  else if(symmetry < 90){
    riskLevel = "Moderate"
    riskReason =
      "Moderate asymmetry observed. Monitoring recommended."
  }

  return {

    symmetry: Number(symmetry.toFixed(1)),

    balanceScore: Math.round(balanceScore),

    stepCount: steps,

    cadence,

    stancePercent,

    swingPercent,

    stepVariability,

    asymmetryIndex: Number(asymmetryIndex.toFixed(1)),

    strideLength,

    riskLevel,

    riskReason,

    leftHeelToeRatio: Number(leftHeelToeRatio.toFixed(2)),

    rightHeelToeRatio: Number(rightHeelToeRatio.toFixed(2))
  }
}

function emptyReport(): WalkReport {
  return {
    symmetry: 100,
    balanceScore: 100,
    stepCount: 0,
    cadence: 0,
    stancePercent: 0,
    swingPercent: 0,
    stepVariability: 0,
    asymmetryIndex: 0,
    strideLength: 0,
    riskLevel: "Low",
    riskReason: "No walking data available.",
    leftHeelToeRatio: 0,
    rightHeelToeRatio: 0,
  }
}