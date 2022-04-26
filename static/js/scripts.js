jQuery(document).ready(function () {

  new WOW().init();

  $('.dropdown').each(function (index, dropdown) {

    //Find the input search box
    let search = $(dropdown).find('.search');

    //Find every item inside the dropdown
    let items = $(dropdown).find('.dropdown-item');

    //Capture the event when user types into the search box
    $(search).on('input', function () {
      filter($(search).val().trim().toLowerCase())
    });

    //For every word entered by the user, check if the symbol starts with that word
    //If it does show the symbol, else hide it
    function filter(word) {
      let length = items.length
      let collection = []
      let hidden = 0
      for (let i = 0; i < length; i++) {
        if (items[i].name.toString().toLowerCase().includes(word)) {
          $(items[i]).show()
        } else {
          $(items[i]).hide()
          hidden++
        }
      }

      //If all items are hidden, show the empty view
      if (hidden === length) {
        $(dropdown).find('.dropdown_empty').show();
      } else {
        $(dropdown).find('.dropdown_empty').hide();
      }
    }

    //If the user clicks on any item, set the title of the button as the text of the item
    $(dropdown).find('.dropdown-menu').find('.menuItems').on('click', '.dropdown-item', function () {
      $(dropdown).find('.dropdown-toggle').text($(this)[0].name);
      $(dropdown).find('.dropdown-toggle').val($(this)[0].name);
      $(dropdown).find('.dropdown-toggle').attr('data', $(this)[0].data);
      let val = $(this)[0].getAttribute('data');
      // console.log(val);
      $(dropdown).find('.dropdown-toggle').attr('data', val);
      $(dropdown).find('.dropdown-toggle').dropdown('toggle');
    })
  });

  var form = document.getElementById('my-form');
  if (form.attachEvent) {
    form.attachEvent("submit", processForm);
  } else {
    form.addEventListener("submit", processForm);
  }

  function processForm(e) {
    e.preventDefault();
    let userData =  $('.btn-secondary.dropdown-toggle').attr('data');
    console.log(userData);
    $.ajax({
      type: 'POST',
      url: $("form#my-form").attr("action"),
      data: $(".dropdown-toggle")[0].value,
      contentType: 'application/json;charset=UTF-8',
      success: function (response) {
        for(var key in response) {
          var event1id = response[key][0];
          var event2id = response[key][1];
          var event3id = response[key][2];
      }
      console.log(event1id, event2id, event3id);
        window.open('http://127.0.0.1:5000/model?event1='+ event1id + 
        '&event2=' + event2id + '&event3=' + event3id  + '&userData=' + userData);
      },
    });
    return false;
  }
});

