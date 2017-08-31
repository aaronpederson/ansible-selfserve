

// function role_call() {
//   $.getJSON('http://127.0.0.1:9393/legacy.json', function(data) {
//     data.packages.forEach(function(role) {
//       add_package(role);
//       add_package_options(role);

//       role.options.forEach(function(option) {
//         add_option(role, option);
//       })
//     })
//     setup()
//   });
// }

function role_call() {
  $.getJSON('http://127.0.0.1:9393/packages.json', function(packages) {
    packages.forEach(function(package_name) {
      add_package(package_name);
      add_package_options(package_name);

      $.getJSON('http://127.0.0.1:9393/package/' + package_name + '/defaults.json', function(defaults) {
        for (option in defaults) {
          add_option(package_name, option, defaults[option])
        }
      })
    })
    setup()
  });
}

role_call()













// ---
function link_slider_to_text(slider_id, text_id) {
  $(text_id).change(function() {
    if ($(text_id).val() === '') {
      $(slider_id).val($(text_id).prop('placeholder'));
    } else {
      $(slider_id).val(this.value);
    }
  });
  $(slider_id).change(function() {
    $(text_id).val(this.value);
    $(text_id).trigger( "change" );
  });
}

function link_all_sliders_to_corresponding_text() {
  $('.selection-list__choice--slider').each(function() {
    var name = this.id.split('_slider')[0];
    link_slider_to_text('#' + name + '_slider', '#' + name + '_input');
  })
}

function setup() {
  $(".selection-list__choice--checkbox").change(function() {
    if(this.checked) {
      $('#' + this.id +'-options').removeClass('hidden');
    } else {
      $('#' + this.id +'-options').addClass('hidden');
    }
  });
  link_all_sliders_to_corresponding_text();  
}

function add_package(role) {
  choice = $('<span></span>', {
    class: 'selection-list__choice'
  })

  $('<input />', {
    class: 'selection-list__choice--checkbox',
    id: 'package-' + role,
    type: 'checkbox'
  }).appendTo(choice)

  $('<label></label>', {
    for: 'package-' + role
  }).text(role).appendTo(choice)

  $(choice).appendTo('#package-list')
}

function add_package_options(role) {
  options = $('<div></div>', {
    class: 'selection-list hidden',
    id: 'package-' + role + '-options'
  })

  $('<h4></h4>', {
    class: 'package-name'
  }).text(role).prependTo(options)

  $(options).appendTo('#config-list')
}

function add_option(role, option_name, option_default) {
  choice = $('<span></span>', {
    class: 'selection-list__choice'
  }).appendTo('#package-' + role + '-options')

  $('<label></label>', {
    for: 'package-' + option_name + '_input'
  }).text(option_name).appendTo(choice);

  input = $('<input />', {
    class: 'selection-list__choice--input',
    id: 'package-' + option_name + '_input'
  }).appendTo(choice)

  switch (typeof(option_default)) {
    case 'string':
      input.prop('placeholder', option_default);
      input.css('width', Math.max(11,input.prop('placeholder').length / 1.85) + 'em');
      break;
    case 'number':
      input.prop('placeholder', option_default)

      $('<input />', {
        class: 'selection-list__choice--slider',
        id: 'package-' + option_name + '_slider',
        type: 'range',
        min: 1,
        max: 20000,
        value: option_default
      }).appendTo(choice)
      break;
    case 'boolean':
      input.prop('type', 'checkbox').prop('checked', option_default)
      break;
  }
  $(input).on('change', function() {
    $('<p class="shopping-cart-item">' + $('#package-' + option_name + '_input').parent().find('label').html() + '</p><p>' + ((this.type == 'checkbox') ? this.checked : ((this.value.length == 0) ? this.placeholder : this.value)) + '</p>'
  ).appendTo('#shopping-cart-items');
    
  });
}

// --- "Contact Details" --- 
input = $('<input />', {id: '#project-input-field'}).appendTo('.project-input-field');
  $(input).on('change', function() {
    $('<p class="shopping-cart-item">' + 'Project Name' + '</p><p>' + this.value + '</p>').appendTo('#shopping-cart-items');
});
input = $('<input />', {id: '#management-input-field'}).appendTo('.management-input-field');
  $(input).on('change', function() {
    $('<p class="shopping-cart-item">' + 'Manager Contact' + '</p><p>' + this.value + '</p>').appendTo('#shopping-cart-items');
});
input = $('<input />', {id: '#developer-input-field'}).appendTo('.developer-input-field');
  $(input).on('change', function() {
    $('<p class="shopping-cart-item">' + 'Developer Contact' + '</p><p>' + this.value + '</p>').appendTo('#shopping-cart-items');
});

// --- "Submit Button in Shopping Cart" ---
$("#submit-button").click(function () {
    document.location.href = "mailto:aaron.pederson@gmail.com";
    document.location.href += getBody();
});

function getBody() {
    return $("#project-input-field");
}
