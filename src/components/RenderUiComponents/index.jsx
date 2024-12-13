const RenderUiComponents = ({ element, onElementClick }) => {
  switch (element.type) {
    case "image":
      return (
        <img
          src={element.src}
          alt={element.alt}
          style={element.styles}
          className="canvas-image"
          onClick={() => onElementClick(element)}
        />
      );
    case "button":
      return (
        <a
          className="canvas-button"
          onClick={() => onElementClick(element)}
          target="_blank"
          href={element.src}
          style={element.styles}
        >
          {element.text}
        </a>
      );
    case "heading":
      const props = {
        className: "canvas-heading",
        onClick: () => {
          onElementClick(element);
        },
        style: element.styles,
      };
      switch (element.tag) {
        case "h2":
          return <h2 {...props}>{element.text}</h2>;
        case "h3":
          return <h3 {...props}>{element.text}</h3>;
        case "h4":
          return <h4 {...props}>{element.text}</h4>;
        default:
          return <h1 {...props}>{element.text}</h1>;
      }
    case "paragraph":
      return (
        <p
          className="canvas-paragraph"
          onClick={() => onElementClick(element)}
          style={element.styles}
        >
          {element.text}
        </p>
      );
    case "list":
      return (
        <ul
          className="canvas-list"
          onClick={() => onElementClick(element)}
          style={element.styles}
        >
          {element.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    default:
      return null;
  }
};

export { RenderUiComponents };
