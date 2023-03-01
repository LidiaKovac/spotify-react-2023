export const getDurationString = (seconds: number) => {
    let hoursNum = seconds / 60 / 60
    let stringHours = hoursNum.toFixed(2).toString()
    let hours = stringHours.split(".")[0]
    let minutes = Math.round((hoursNum - Number(hours)) * 60).toString()
    console.log(minutes)
    return `${hours} ore ${minutes} min`
}