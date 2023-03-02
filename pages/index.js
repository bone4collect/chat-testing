import { useEffect } from "react";

import $ from "jquery";
import Gun from "gun";

export default function Home() {
  useEffect(() => {
    const gun = Gun('https://solciety-gun-nodess.onrender.com').get("thoughts");
    $("form").on("submit", function (event) {
      event.preventDefault();
      gun.set($("input").val());
      $("input").val("");
    });
    gun.map().on(function (thought, id) {
      const li = $("#" + id).get(0) || $("<li>").attr("id", id).appendTo("#todo-list");
      if (thought) {
        $(li).text(thought);
      } else {
        $(li).hide();
      }
    });
    $("body").on("dblclick", "li", function (event) {
      gun.get(this.id).put(null);
    });
  }, []);

  return (
    <div>
      
      <h1>Chat App</h1>
      <form>
        <input /> <button>Thoughts</button>
      </form>
      <ul id="todo-list"></ul>
    </div>
  );
}
