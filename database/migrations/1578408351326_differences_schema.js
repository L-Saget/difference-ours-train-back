'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DifferencesSchema extends Schema {
  up () {
    this.create('differences', (table) => {
      table.increments()
      table.string('diff', 2048).notNullable()
      table.string('autor', 512).notNullable()
    })
  }

  down () {
    this.drop('differences')
  }
}

module.exports = DifferencesSchema
