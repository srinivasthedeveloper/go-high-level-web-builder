const ELEMENT_TYPES = {
  paragraph: {
    type: "paragraph",
    defaultProps: {
      text: "New Paragraph",
      styles: {
        color: "#000000",
        fontSize: "16px",
        textAlign: "left",
      },
    },
  },
  heading: {
    type: "heading",
    defaultProps: {
      text: "New Heading",
      tag: "h1",
      styles: {
        color: "#000000",
        textAlign: "left",
      },
    },
  },
  image: {
    type: "image",
    defaultProps: {
      src: "https://via.placeholder.com/300x200",
      alt: "Image",
      styles: {
        width: "100px",
        height: "100px",
      },
    },
  },
  list: {
    type: "list",
    defaultProps: {
      items: ["Item 1", "Item 2", "Item 3"],
      styles: {
        color: "#000000",
        fontSize: "16px",
        textAlign: "left",
      },
    },
  },
  button: {
    type: "button",
    defaultProps: {
      text: "Click me",
      src: "https://www.google.com",
      styles: {
        backgroundColor: "#007bff",
        color: "#ffffff",
        padding: "8px 16px",
        border: "none",
        borderRadius: "4px",
        textDecoration: "none",
      },
    },
  },
};

export { ELEMENT_TYPES };
