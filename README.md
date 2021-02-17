#### **1.  Image docker**
I build the image docker: docker build -t ernestoagc/app-ueat:0.3 .

also you can download these version on 
docker pull ernestoagc/app-ueat:0.3

#### **2. Running frontend application**
I goint to use a docker container, to create this we can do with this command:
docker run -p 8082:80 -d  --network ueat-red  --name=app-ueat ernestoagc/app-ueat:0.3

Finally, we can use the application with the url: http://localhost:8082/

![](https://i.imgur.com/OFeAMwh.jpg)