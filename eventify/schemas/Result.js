export default {
    name: "result",
    title: "Result",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Event Name",
        type: "string",
      },
      {
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
          source: "title",
          maxLength: 96,
        },
      },
      {
        name: "winner",
        title: "Winner",
        type: "string",
      },
      {
        name: "runner",
        title: "Runner",
        type: "string",
      },
      {
        name: "secRunner",
        title: "Second Runner",
        type: "string",
      },
    ],
  };
  