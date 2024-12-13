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
      return (
        <h1
          className="canvas-heading"
          onClick={() => {
            console.log(element);
            onElementClick(element);
          }}
          style={element.styles}
        >
          {element.text}
        </h1>
      );
    default:
      return null;
  }
};

export { RenderUiComponents };
