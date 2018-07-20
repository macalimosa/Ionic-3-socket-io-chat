export function RestangularConfigFactory(RestangularProvider, Storage) {
  RestangularProvider.setBaseUrl('http://api.servicesolutions.local');

  Storage.get('token').then((val) => {
    console.log('storange token',val);
    RestangularProvider.setDefaultHeaders(
      {
        'Authorization': 'Bearer ' + val,
        'Content-Type': 'application/json'
      },
    );
  }
  );


}