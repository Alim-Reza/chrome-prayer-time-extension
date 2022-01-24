function getCurrentDayOfTheMonth() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    getPrayerTimes(parseInt(dd), mm, yyyy);
}

function getPrayerTimes(day, month, year) {
    fetch("http://api.aladhan.com/v1/calendarByCity?city=Dhaka&country=Bangladesh&method=4&month="+month.toString()+"&year="+year.toString(), {
        "method": "GET",
        "headers": {}
      })
      .then(response => {
        return response.json();
      }).then( responseData => {
        console.log(responseData.data[day].date.readable);
        console.log(responseData.data[day].date.hijri.date);
        console.log(responseData.data[day].date.hijri.month.en);
        console.log(responseData.data[day].timings);
        document.getElementById('fajr-time').innerText = "শুরু : " + timeFormater(responseData.data[day].timings.Fajr); 
        document.getElementById('sunrise-time').innerText = "সূর্যোদয়ের সময় : " + timeFormater(responseData.data[day].timings.Sunrise); 
        document.getElementById('dhuhr-time').innerText = "শুরু : " + timeFormater(responseData.data[day].timings.Dhuhr); 
        document.getElementById('asr-time').innerText = "শুরু : " + timeFormater(responseData.data[day].timings.Asr); 
        document.getElementById('maghrib-time').innerText = "শুরু : " + timeFormater(responseData.data[day].timings.Maghrib); 
        document.getElementById('sunset-time').innerText = "সূর্যাস্তের সময় : " + timeFormater(responseData.data[day].timings.Sunset); 
        document.getElementById('isha-time').innerText = "শুরু : " + timeFormater(responseData.data[day].timings.Isha); 
        document.getElementById('midnight-time').innerText = "মধ্যরাতের সময় : " + timeFormater(responseData.data[day].timings.Midnight); 
        const hashTable = {
            'fajr-time': responseData.data[day].timings.Fajr, 
            'sunrise-time': responseData.data[day].timings.Sunrise, 
            'dhuhr-time': responseData.data[day].timings.Dhuhr, 
            'asr-time': responseData.data[day].timings.Asr, 
            'maghrib-time': responseData.data[day].timings.Maghrib, 
            'sunset-time': responseData.data[day].timings.Sunset, 
            'isha-time': responseData.data[day].timings.Isha, 
            'midnight-time': responseData.data[day].timings.Midnight, 
        }
      })
      .catch(err => {
        console.error(err);
      });
}

function timeFormater(data) {
    return translateBanglaNumber(timeConverter(data))
}
function timeConverter(data) {
    let cleanedData = timeDataCleaner(data)
    let hour = parseInt(cleanedData.slice(0,2))
    cleanedData = (hour > 12 ? (hour - 12).toString() : hour.toString() )+ cleanedData.slice(2, 5)
    return cleanedData
}
function timeDataCleaner(time) {
    return time.slice(0,5)
}
function translateBanglaNumber(data) {
    const banglaNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
    let translatedNumber = ''
    for (var i = 0; i<data.length; i++){
        if (data.charAt(i) === ':') {
            translatedNumber += ':'
        } else if(parseInt(data.charAt(i)) !== NaN){
            translatedNumber += banglaNumbers[parseInt(data.charAt(i))]
        }
    }

    return translatedNumber;
}

getCurrentDayOfTheMonth();