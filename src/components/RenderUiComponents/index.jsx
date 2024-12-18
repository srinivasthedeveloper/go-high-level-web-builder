import { useState } from "react";
import styles from "./styles.module.css";

const RenderUiComponents = ({ element, onElementClick }) => {
  const [showTools, setShowTools] = useState(false);

  return (
    <div
      onMouseOver={() => {
        setShowTools(true);
      }}
      onMouseLeave={() => {
        setShowTools(false);
      }}
      className={styles.outerContainer}
    >
      {showTools ? (
        <div className={styles.tools}>
          <button onClick={() => onElementClick(element)}>Edit</button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onElementClick(element, true);
            }}
          >
            Delete
          </button>
        </div>
      ) : null}
      <RenderUiElements element={element} onElementClick={onElementClick} />
    </div>
  );
};

const RenderUiElements = ({ element, onElementClick }) => {
  switch (element.type) {
    case "image":
      return (
        <img
          src={element.src}
          alt={element.alt}
          style={element.styles}
          onClick={() => onElementClick(element)}
        />
      );
    case "button":
      return (
        <a
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
        <p onClick={() => onElementClick(element)} style={element.styles}>
          {element.text}
        </p>
      );
    case "list":
      return (
        <ul onClick={() => onElementClick(element)} style={element.styles}>
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
