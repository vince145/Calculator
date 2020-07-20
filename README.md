# Calculator
 
A simple multi-user calculator web app built using ReactJS utilizing AWS Amplify (Amazon Web Services) for serverless hosting and GraphQL / AmazonDynamoDB API for calculation storage. Calculations are evaluated using the https://mathjs.org/ library's evaluate function. Calculations are created on the user's end and submitted using GraphQL queries to be stored within the AmazonDynamo database. Every 1000ms the app fetches stored calculations by using GraphQL queries. The fetched calculations are then sorted descending from most recent to oldest showing only the last 10 calculations to users.

![Calculator Web App Example](https://raw.githubusercontent.com/vince145/Calculator/master/pictures/Calculator%20Web%20App%20Example.PNG)

![AWS Amplify Console Example](https://raw.githubusercontent.com/vince145/Calculator/master/pictures/AWS%20Amplify%20Console%20example.PNG)

![AWS DynamoDB Example](https://raw.githubusercontent.com/vince145/Calculator/master/pictures/AWS%20DynamoDB%20example.PNG)
