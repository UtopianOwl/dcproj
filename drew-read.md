## Edit Cars:

1.client/app/cars/cars.html (30-60): Added a form for editing the Car Entries below the panel for car entries in the ng-repeat. Using ng-hide, ng-show, and the editToggle property (added on line 9 of car.model.js) I toggle between the edit view and the display view. Also added a little pencil icon to toggle editing from the view mode.

1.client/app/cars/cars.controller.js (37-46): Added and editCar method which takes the edited car as parameter changes the view back to view mode, and also calls the new editCar method of the CarService, injecting the edited car as a parameter.

1.client/app/cars/cars.service.js (34-37): Created an editCar method on the CarService wich initiates an http put request to the server at the api endpoint "/api/v1/cars/:id". This returns a promise with the edited car object.

1.server/api/cars/car.controller.js (47) adjusted the existing update method in the cars controller on the api to find by id (simplifies the first parameter).

## Change Password:

1.created everything in /client/app/change-password:
  1.change-password.controller.js
  1.change-password.html
  1.change-password.module.js
  
1.Module sets up the template for the password page, tells it what hash should redirect to it, and defines its controller.

1.HTML is just the form and a button.

1.Controller calls a function in the UserService which handles the actual logic.

1.client/app/users/user.service.js (50-62): Created a new method called changePassword which accepts user data and the new password as parameters and sends out an PUT request with the data. It then sets the token and user data from the response.

1.server/api/users/user.routes.js (7): Added a new api endpoint for changePassword requests

1.server/api/users/user.controller.js (83-103): created a function that handles the Put request at the change password API endpoint. It hashes the new password then saves the updated user and creates a new token for validation, then it sends the token and user data to be stored in local storage.