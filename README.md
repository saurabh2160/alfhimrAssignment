# alfhimrAssignment

3-Models
-UserModel : stores data regarding users
-ProductModel : stores data regarding products
-OrderModel : stores data for orders

Controller:
All the APIs are inside this folder.
-UserController:Contains API for registering users.
-ProductController:2-APIs 
    -CreateProduct: This API will save product details inside DB-Products collection
    -GetProduct: This API will fetch product by category as mention in problem statement ans will also group them into two parts
                 i.e Group-1: All products with price equal to 1000 rupee and greater then 1000 rupee
                     Group-2:  All products with price less then 1000 rupee.
                     This API itself has Redis to cache the response so if in next request same data is required instead making an data base call data will be fetch from 
                     redis itself this has reduced reponse time by half i.e from 500ms to 249ms.
                     
-OrderController: This API will save seprate orders for each and every customer inside db.
