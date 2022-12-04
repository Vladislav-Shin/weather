
export const calcSeconds = (date: any, time?: any) => {
  const hours = Math.floor((date.split(":")[0]) * 60 * 60);
  const minutes = Math.floor(date.split(":")[1] * 60);
  const seconds = date.split(":")[2]

  const res = +hours + +minutes + +seconds + time
  return res
}

export const chunk = (arr: any) => {
  const arr2 = arr.list.reduce((acc: any, elem: any) => {
    if (acc[elem.dt_txt.split(' ')[0]]) {
      acc[elem.dt_txt.split(' ')[0]] += `${Math.round(elem.main.temp)};`
    } else {
      acc[elem.dt_txt.split(' ')[0]] = `${Math.round(elem.main.temp)};`
    }
    return acc
  }, {})

  const arr3 = Object.values(arr2);

  const arr4 = arr3
    .map((item: any) => {
      return item.split(";")
    })
    .map((item: any) => {
      const arr = item
        .filter((item: any) => item !== "")
        .map((item: any) => +item)
      return arr
    })

  const maxTemp = arr4.map((item: any) => Math.max(...item))
  const minTemp = arr4.map((item: any) => Math.min(...item))

  return {
    maxTemp: maxTemp,
    minTemp: minTemp,
    currentDay: arr4[0]
  }
}

export const timeConverter = (UNIX_timestamp: number) => {
  var a = new Date(UNIX_timestamp * 1000);
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds() < 10 ? "0" + a.getSeconds() : a.getSeconds();
  var time = hour + ':' + min + ':' + sec;
  return time;
}

export const showDataWeather = (data: any, arg?: any) => {
  const arr = [] as any
  
  
  data.forEach((item: any) => {
    arr.push(item.dt_txt)
  })
  console.log(arr);
  
  const index = arr.indexOf(arg)
  const res = data.slice(index, index + 8);

  return res
}

export const indexDay = (id: string | any) => {
  let dayId = id?.split("")
  if (dayId![0] === "0") {
    dayId = dayId![1]
  }

  return dayId
}