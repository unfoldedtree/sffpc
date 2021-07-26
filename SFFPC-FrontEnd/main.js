$(document).ready(function(){

    $("#caseForm").submit( function (e) {
        //ajax call here
        findCase();
        //stop form submission
        e.preventDefault();
     });

     $(document).on("click", "#filterSubmit", function() {
        findCase();
    });

     function findCase() {
      var caseVendor = $("#inputVendor").val();
      var caseModel = $("#inputModel").val();
      var apiCall;
      if ((caseModel != "") && (caseVendor != "")) {
        apiCall = `http://localhost:3000/${caseVendor}/${caseModel}`;
        console.log("Search Vendor and Model");
      } 
      else if ((caseModel === "") && (caseVendor != ""))  {
        apiCall = `http://localhost:3000/seller/${caseVendor}`;
        console.log("Search Vendor");
      } 
      else if ((caseModel != "") && (caseVendor === "")) {
        apiCall = `http://localhost:3000/case/${caseModel}`;
        console.log("Search Model");
      }
      else {
        apiCall = `http://localhost:3000/all`;
        console.log("Search All");
      }
      $.getJSON( apiCall, function( data ) {
          generateElements(data);
        });
     }

    function generateElements(collection) {
      if ($("#filterGpu").val() != "") {
        collection = collection.filter((element) => {
          return parseFloat(element.gpuLength) >= $("#filterGpu").val();
        })
      }

      if ($("#filterCpu").val() != "") {
        collection = collection.filter((element) => {
          return parseFloat(element.cpuCooler) >= $("#filterCpu").val();
        })
      }

      if ($("#filterVolume").val() != "") {
        collection = collection.filter((element) => {
          return parseFloat(element.caseVolume) <= $("#filterVolume").val();
        })
      }

      if ($("#flexRadioAscending").prop("checked") == true) {
        collection.sort((a, b) => parseFloat(a.caseVolume) - parseFloat(b.caseVolume));
      }
      else {
        collection.sort((a, b) => parseFloat(b.caseVolume) - parseFloat(a.caseVolume));
      }

      $(".api-result").remove();

      $('#renderCases').pagination({
        dataSource: collection,
        pageSize: 6,
        callback: function(data, pagination) {
          $('#renderCases .wrapper').empty();
          data.forEach(element => {
            // console.log(element._id);
            var result = 
            $(`<div class="card mb-3 api-result">
                <div class="card-body">
                  <h5 class="card-title">${element.seller}</h5>
                  <p class="card-text">${element.caseName}</p>
                  <p class="card-text"><small class="">
                  Volume: ${element.caseVolume} liters</small></p>
                  <button type="button" class="btn btn-secondary qresult"
                  data-bs-toggle="modal" data-bs-target="#caseModal" id="${element._id}">
                  More</button>
                </div>
                </div>`);
            // result.text('Button ' + 1);
            $("#renderCases .wrapper").append(result);
          });
        }
      })
    };

    //Begin Clear Filter
    $(document).on("click", "#clearInputs", function() {
      $('#renderCases .wrapper').empty();
      $('.paginationjs').empty();
      $("#inputVendor").val('');
      $("#inputModel").val('');
      $("#filterCpu").val('');
      $("#filterGpu").val('');
      $("#filterVolume").val('');
      $("#flexRadioAscending").prop("checked", true);
    });
    
    //End Clear Filter
    $(document).on("click", "button.qresult", function() {

      apiCall = `http://localhost:3000/id/${this.id}`;

      $.getJSON( apiCall, function( data ) {
       console.log(data);
       var result = data[0];
       $("#manufacturer").text(result.seller);
       $("#model").text(result.caseName);
       $("#style").text(result.style);
       $("#volume").text(result.caseVolume);
       $("#caseLength").text(result.caseLength);
       $("#caseWidth").text(result.caseWidth);
       $("#caseHeight").text(result.caseHeight);
       $("#gpuLength").text(result.gpuLength);
       $("#gpuWidth").text(result.gpuWidth);
       $("#gpuHeight").text(result.gpuHeight);
       $("#pcieSlots").text(result.pcieSlot);
       $("#lpSlots").text(result.lpPcieSlot);
       $("#pcieRiser").text(result.gpuRiser);
       $("#coolerHeight").text(result.cpuCooler);
       $("#aio").text(result.aio);
       $("#motherboard").text(result.motherboard);
       $("#psu").text(result.psu);
       $("#ssd").text(result.sddDrive);
       $("#hdd").text(result.hddDrive);
       $("#dvd").text(result.diskDrive);
       $("#usb2").text(result.usb2);
       $("#usb3").text(result.usb3);
       $("#usbc").text(result.usbC);
       $("#fpAudio").text(result.audioJack);
       $("#cny").text(result.priceCNY);
       $("#usd").text(result.priceUSD);
       });
  });

  $("#caseModal").on("hidden.bs.modal", function () {
    $("#manufacturer").text("");
    $("#model").text("");
    $("#style").text("");
    $("#volume").text("");
    $("#caseLength").text("");
    $("#caseWidth").text("");
    $("#caseHeight").text("");
    $("#gpuLength").text("");
    $("#gpuWidth").text("");
    $("#gpuHeight").text("");
    $("#pcieSlots").text("");
    $("#lpSlots").text("");
    $("#pcieRiser").text("");
    $("#coolerHeight").text("");
    $("#aio").text("");
    $("#motherboard").text("");
    $("#psu").text("");
    $("#ssd").text("");
    $("#hdd").text("");
    $("#dvd").text("");
    $("#usb2").text("");
    $("#usb3").text("");
    $("#usbc").text("");
    $("#fpAudio").text("");
    $("#cny").text("");
    $("#usd").text("");
  });


 });


 

