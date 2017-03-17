import { expect, chai } from '../../../../../configuration/testSetup'
import app from '../../../server'
import {
  withThreeCouldDos,
  withThreeProjects
} from '../../../../dataServices/database/testsHelper'

describe.only( 'couldDo routes', () => {

  context( '/project/:id/could-dos', () => {

    withThreeCouldDos( () => {

      it( 'should get all could-dos for a project id', () =>
        chai.request( app )
          .get( '/project/1/could-dos' )
          .then( response => {
            const couldDos = response.body
            expect( couldDos.length ).to.equal( 2 )
            const couldDoTexts = couldDos.map( couldDo => couldDo.text ).sort()
            expect( couldDoTexts ).to.eql( ['eat breakfast', 'eat zero sugar'] )
          })
      )

      it( 'should throw an error if no project with given id is found', () =>
        chai.request( app )
          .post( '/project/198/could-dos' )
          .catch( error => expect( error ).to.be.an.instanceof( Error ))
      )

    })
  })

  context( '/project/new', () => {

    it( 'should return created project', () =>
      chai.request( app )
        .post( '/project/new' )
        .send({ name: 'learn workman-p', user_id: 1, })
        .then( response => expect( response.body.name ).to.equal( 'learn workman-p' ) )
    )

    it( 'should throw an error if supplied invalid attributes', () =>
      chai.request( app )
        .post( '/project/new' )
        .send({ backpain: 'not rad', user_id: 'ten thousand' })
        .catch( error => expect( error ).to.be.an.instanceof( Error ))
    )

  })

  context( '/project/edit/:id', () => {

    withThreeProjects( () => {

      it( 'should return the edited project', () =>
        chai.request( app )
          .post( '/project/edit/77' )
          .send({ name: 'juggling' })
          .then( response => expect( response.body.name ).to.equal( 'juggling' ))
      )

      it( 'should throw an error if no project with given id is found', () =>
        chai.request( app )
          .post( '/project/edit/777777' )
          .send({ text: 'stretching' })
          .catch( error => expect( error ).to.be.an.instanceof( Error ))
      )

      it( 'should throw an error if given invalid attributes', () =>
        chai.request( app )
          .post( '/project/edit/77' )
          .send({ backpain: 'not rad', user_id: 'ten thousand' })
          .catch( error => expect( error ).to.be.an.instanceof( Error ))
      )

    })
  })

  context( '/project/delete/:id', () => {

    withThreeProjects( () => {

      it( 'should return 1 after deleting one item', () =>
        chai.request( app )
          .post( '/project/delete/77' )
          .then( response => expect( response.body ).to.equal( 1 ))
      )

      it( 'should throw an error if no project with given id is found', () =>
        chai.request( app )
          .post( '/project/delete/777777' )
          .catch( error => expect( error ).to.be.an.instanceof( Error ))
      )

    })

  })

  context( '/user/:id/projects', () => {

    withThreeProjects( () => {

      it( 'should get all projects for a user id', () =>
        chai.request( app )
          .get( '/user/1/projects' )
          .then( response => {
            const projects = response.body
            expect( projects.length ).to.equal( 2 )
            const projectNames = projects.map( couldDo => couldDo.name ).sort()
            expect( projectNames ).to.eql( ['eating', 'sleeping'] )
          })
      )

      it( 'should throw an error if no projects for given user id are found', () =>
        chai.request( app )
          .get( '/user/111234/projects' )
          .catch( error => expect( error ).to.be.an.instanceof( Error ))
      )

    })

  })

})
