M3 - `README.md` IRON Store

<br>

## Description

This is an E-commerce website where users can buy items related to Iron Hack. (T-shirt, Mugs, face mask, Hats, etc...)

## User Stories

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- **Signup:** As an anon I can sign up in the platform so that I can buy & review products
- **Login:** As a user I can login to the platform so that I can buy products
- **Logout:** As a user I can logout from the platform so no one else can use it
- **Edit profile** As a user I can edit a my profile to change my info
- **List of Products** As a user I want to see a list of all the products
- **Product Details** Description of the product
- **Shop cart** As a user I want to see the products that I want to buy
- **Buy Products** As a user I can buy items from the shop
- **Review** As a user I can make a review about the product that I bought
- **Delete Product** As a user I can delete a product from the cart if I change my mind

## Backlog

User profile:

- Review the product
- API of Captcha
- Favorite Product to buy it later

<br>

# Client / Frontend

## React Router Routes (React App)

| Path               | Component            | Permissions                | Behavior                                                      |
| ------------------ | -------------------- | -------------------------- | ------------------------------------------------------------- |
| `/`                | `SplashPage`         | public `<Route>`           | Home page                                                     |
| `/signup`          | `SignupPage`         | anon only `<AnonRoute>`    | Signup form, link to login, navigate to homepage after signup |
| `/login`           | `LoginPage`          | anon only `<AnonRoute>`    | Login form, link to signup, navigate to homepage after login  |
| `/`edit-profile    | `EditProfilePage`    | user only `<PrivateRoute>` | edit name, email, etc...                                      |
| `/`profile         | `ProfilePage`        | user only `<PrivateRoute>` | see name, email, shipping address, etc...                     |
| `/product/add`???? | `AddProductPage`     | user only `<PrivateRoute>` | Add a product if are admin                                    |
| `/product/:id`     | `ProductDetailsPage` | user only `<PrivateRoute>` | Details of a product                                          |
| /cart              | `CartPage`           | user only `<PrivateRoute>` | Buy items that you add to the cart                            |
| /product/list      | `ProductListPage`    | public `<Route>`           | `Home page? or another??                                      |
|                    |                      |                            |                                                               |
|                    |                      |                            |                                                               |

<br>

## Components

- LoginPage

- SplashPage

- ProductList

- ProductDetails

- Navbar

## Services

- Auth Service

  - auth.login(user)

  - auth.signup (user)

  - auth.logout()

  - auth.me()

  - auth.getUser()

- Product Service

  - productsService.getAll()

  - productsService.getOne (id)

  - productsService.add (id) //only for admin

  - productsService.deleteOne (id)

- User Service

  - userService.updateOne ({data})
  - userService.addToCart (productId)
  - userService.removeItem (productId)

- userService.makePayment ( )

<br>

# Server / Backend

## Models

User model

```javascript
{
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  shippingAddress: {type: String, required: true}
  cart: [
      {
          product: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
          qty: { type: Number, min: 1, required: true }
      }

  ]
}
```

Product Model

```javascript
{
   name: {type: String, required: true},
   image: {type: String, required: true},
   description: {type: String, required: true},
   price: {type: Number, required: true},
   reviews: [{type: String}]
 }
```

<br>

## API Endpoints (backend routes)

| HTTP Method | URL                          | Request Body            | Success status | Error Status | Description                                                                                                         |
| ----------- | ---------------------------- | ----------------------- | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------- |
| GET         | `/auth/me`                   | (empty)                 | 200            | 404          | Check if user is logged in and return `currentUser` data from the session. This is the main request for React auth. |
| POST        | `/auth/signup`               | {name, email, password} | 201            | 404          | Checks if fields not empty and user not exists, then create user with encrypted password, and store user in session |
| POST        | `/auth/login`                | {username, password}    | 200            | 401          | Checks if fields not empty (400), if user exists (404), and if password matches (401), then stores user in session  |
| GET         | `/auth/logout`               | (empty)                 | 204            | 400          | Logs out the `currentUser` and destroy the session                                                                  |
| GET         | `/api/products`              | (empty)                 |                | 400          | Show all the products                                                                                               |
| GET         | `/api/products/:id`          | {id}                    |                |              | Show specific product                                                                                               |
| POST        | `/api/products`/:id/review   | (empty)                 |                |              | Post a review of the product                                                                                        |
| GET         | `/api/products/:id/review`   | (empty)                 |                |              | show a review of the product                                                                                        |
| DELETE      | `/api/users/cart/:productId` | (empty)                 | 201            | 400          | delete product from the cart of the current user                                                                    |
| PUT         | `/api/users/cart`            | {productId, qty}        | 200            | 400          | update the cart of the current user by adding one product                                                           |
| GET         | `/api/users/cart`            | (empty)                 |                | 400          | show cart of the current user by accessing id from the session (`req.session.currentUser`)                          |
| PUT         | `/api/users`                 |                         |                |              | edit profile of the current user by accessing id from the session (`req.session.currentUser`)                       |
|             |                              |                         |                |              |                                                                                                                     |
|             |                              |                         |                |              |                                                                                                                     |
|             |                              |                         |                |              |                                                                                                                     |
|             |                              |                         |                |              |                                                                                                                     |
|             |                              |                         |                |              |                                                                                                                     |
|             |                              |                         |                |              |                                                                                                                     |
|             |                              |                         |                |              |                                                                                                                     |
|             |                              |                         |                |              |                                                                                                                     |

<br>

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/AjLFucxh/ironstore)
or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/arslaneramy/ironstorefront.git)

[Server repository Link](https://github.com/arslaneramy/ironstore.git)

[Deployed App Link](http://heroku.com/)

### Slides

The url to your presentation slides

[Slides Link]()
