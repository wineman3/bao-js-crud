import Bao from "baojs";

const app = new Bao();

app.get("/todos", async (ctx) => {
  const toDos = [{ description: "test", finished: false }];
  return ctx.sendPrettyJson(toDos);
});

app.post("/todo", async (ctx) => {
  const json = await ctx.req.json();
  if (!json.description) return ctx.sendEmpty({ status: 400 });
  const toDo = {
    description: json.description,
    finished: json.finished ?? false,
  };
  console.log(toDo);
  return ctx.sendEmpty({ status: 201 });
});

// Custom error handler
app.errorHandler = () => {
  return new Response("Oh no! An error has occurred...");
};

app.listen({ port: 8080 });
