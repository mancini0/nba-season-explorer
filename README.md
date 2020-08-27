```
npm install  
npm run serve  
```


The application will be reachable at localhost:8080


<b>Problem statement:</b>

</p>Write a react.js application that consumes csv NBA season data and graphs a team's performance over time. The user should be able to
analyze a teams performance when they are at home and when they are away independently.The user should be able to select only the teams 
of interest to him or her. </p>

<b>Solution:</b>

An npm postinstall script converts the provided csv to json. The csv data is massaged into a json format (an object keyed by the teams of the league) that allows the application to apply its business logic in a clean, efficient, concise, and readable manner - the solution is only around 100 lines of code.

