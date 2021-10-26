$(() => {

  const $propertyListings = $(`
  <section class="property-listings" id="property-listings">
      <p>Loading...</p>
    </section>
  `);
  window.$propertyListings = $propertyListings;

  window.propertyListings = {};

  function addListing(listing) {
    $propertyListings.append(listing);
  }
  function clearListings() {
    $propertyListings.empty();
  }
  window.propertyListings.clearListings = clearListings;

  function addProperties(properties, isReservation = false) {
    clearListings();
    for (const propertyId in properties) {
      const property = properties[propertyId];
      const listing = propertyListing.createListing(property, isReservation);
      addListing(listing);
    }
  }
  window.propertyListings.addProperties = addProperties;


  $("body").on('submit', function(event) {
    if ($(event.target).hasClass("booking-form")) {      
      event.preventDefault();

      const data = $(event.target).serialize();
      makeReservation(data)
        .then(json => {
          $(event.target).html(`<h2>Booked!</h2>`);
        });
    }
  });
});