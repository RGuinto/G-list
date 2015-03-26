package glist

import akka.actor.Actor
import spray.routing
import spray.routing.HttpService
import spray.http.MediaTypes._

/**
 * Created by Jayron on 2015-03-26.
 */
class GroceryListServiceActor extends Actor with GroceryListService{
  def actorRefFactory = context

  def receive = runRoute(serverRoute)
}

trait GroceryListService extends HttpService {
  val serverRoute =
    pathSingleSlash {
      showIndex()
    } ~
    path("list") {
      showList()
    }

  def showIndex(): routing.Route = {
    get {
      respondWithMediaType(`text/html`) {
        complete {
          <html>
            <body>
              <h1>This is the grocery list server.</h1>
            </body>
          </html>
        }
      }
    }
  }

  def showList(): routing.Route = {
    get {
      respondWithMediaType(`text/html`) {
        complete {
          <html>
            <body>
              <h1>Inside path /list</h1>
            </body>
          </html>
        }
      }
    }
  }
}