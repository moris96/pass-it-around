// Require modules 
const fs = require('fs')
const express = require('express')

// Create express app 
const app = express()

// Configure the app (app.set)
/*Start Config */
app.engine('evelyn', (filePath, options, callback) => { // define the view engine called hypatia
    fs.readFile(filePath, (err, content) => {
      if (err) return callback(err)
      // this is an extremely simple view engine we'll be more complex later
      const rendered = content.toString()
        .replace('#title#', `<title>${options.title}</title>`)
        .replace('#message#', `<h1>${options.message}</h1>`)
        .replace('#content#',`<div>${Array.isArray(options.content)? options.content.map(item => `<li>${item}</li>`).join('') : options.content }</div>` )
      return callback(null, rendered)
    })
  })
  app.set('views', './views') // specify the views directory
  app.set('view engine', 'evelyn') // register the evelyn view engine

/* END CONFIG */


// Index 
app.get('/', (req, res) => {
    res.render('template', { title: 'Got Milk',
    message: 'Got milk?',
    content: `<h3>99 bottles of milk on the wall</h3> 
    <style>
        h3 {
            color: red;
        }
        h1 {
            color: blue;
        }
    </style>
    <a href=\"/98\">take one and pass it around</a>
    <div><img src="https://media.makeameme.org/created/got-milk-no.jpg" width=1500 height=650></div>` 
    })
})

app.get('/:number_of_bottles', (req, res) => {
    if (isNaN(req.params.number_of_bottles) === false){
        if (parseInt(req.params.number_of_bottles) === 99){
          res.send('<h4>99 bottles of beer on the wall</h4><a href=\"/98\"> take one down, pass it around... </a>')
        }
        else if (parseInt(req.params.number_of_bottles) === 98){
          res.send('<h4>'+req.params.number_of_bottles+" bottles of milk on the wall</h4><a href=\"/"+(req.params.number_of_bottles-1)+"\"> take one down, pass it around... </a> <br> <a href=\"/\">take one back</a>" + `<div><img src="https://i.imgflip.com/40j0zy.jpg"></div>`);
        }
        else if (parseInt(req.params.number_of_bottles) === 0){
          res.send("<h4>"+req.params.number_of_bottles+" bottles of milk on the wall. Party\'s Over.</h4><a href=\"/\">Start Over?</a>");
        }
        else if (parseInt(req.params.number_of_bottles) > 99){
          res.send("<h4>"+req.params.number_of_bottles+" bottles of milk?? You will get a stomache ache!</h4><a href=\"/\">Start Over!</a>");
        }
        else if (parseInt(req.params.number_of_bottles) < 0){
          res.send("<h4>"+req.params.number_of_bottles+" bottles of milk? You can't have a negative number of milk cause it is impossible!</h4><a href=\"/\">Back to start</a>");
        }
        else{
          res.send("<h4>"+req.params.number_of_bottles+" bottles of milk on the wall</h4><a href=\"/"+(req.params.number_of_bottles-1)+"\"> take one down, pass it around... </a> <br> <a href=\""+( parseInt(req.params.number_of_bottles) + 1)+"\">take one back</a>" + `<div><img src="https://i.imgflip.com/40j0zy.jpg"></div>`);
        }
      }
      else{
        res.send("<h4>"+req.params.number_of_bottles+"?? Bruh play by the rulez!!!</h4><a href=\"/\"> Back to 99 Bottles of milk on the wall... </a>");
      }
})


// App port 
app.listen(3000, () => {
    console.log('Listening on Port 3000')
})