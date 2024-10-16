var latest_update_log_filename="16-10-2024.json";

function DateTime(return_type){
    var datetime_now = new Date();
    if(return_type=="year"){
        return datetime_now.getFullYear();
    }
    else if(return_type=="localdatestring"){
        return datetime_now.toLocaleString();
    }
    else if(return_type=="localtimestring"){
        return datetime_now.toLocaleTimeString();
    }
    else{
        return datetime_now;
    }
}

async function loadLatestJSONFile(filename) {
    try {
        if (filename) {
            const response = await fetch("/data/update_logs/" + filename);
            const data = await response.json();
            console.log(data);

            // Insert data into HTML elements for each environment
            document.getElementById("dev-lastupdate").textContent = data.dev.last_updated;
            document.getElementById("beta-lastupdate").textContent = data.beta.last_updated;
            document.getElementById("staging-lastupdate").textContent = data.staging.last_updated;
            document.getElementById("prod-lastupdate").textContent = data.prod.last_updated;
        } else {
            console.error("No JSON file found.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}


// Load JSON data from the file with the most recent datetime
loadLatestJSONFile(latest_update_log_filename);


document.getElementById("date").innerHTML = DateTime("year");
setInterval(function() {
    document.getElementById("site-datetime").innerHTML = DateTime();
  }, 1000);
