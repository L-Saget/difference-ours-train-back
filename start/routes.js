'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');
const Database = use('Database');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.get('/differences', async ({ response }) => {
  const diff = await Database.select('*').from('differences')
  response.send(diff)
})

Route.get('/differences/random', async ({ response }) => {
  const diff = await Database.select('*').from('differences')
  response.send(diff[getRandomInt(diff.length)])
})

Route.get('/differences/:id', async ({params, response}) => {
  const id = params.id;
  const diff = await Database.select('*').from('differences').where('id', id)
  response.send(diff)
})

Route.post('/differences/:diff/:autor', async ({params, response}) =>  {
  const autor = params.autor;
  const diff = params.diff;
  const DiffId = await Database
    .insert({ diff: diff, autor: autor })
    .into('differences')
    .returning('id')
  response.send(DiffId)
})

