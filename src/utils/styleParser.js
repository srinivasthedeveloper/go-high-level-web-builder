// Convert CSS string to style object
const cssToStyleObject = (css) => {
  if (!css) return {};
  const styles = {};
  css
    .split(";")
    .map((style) => style.trim())
    .filter((style) => style.length > 0)
    .forEach((style) => {
      const [property, value] = style.split(":").map((s) => s.trim());
      // Convert kebab-case to camelCase
      const camelProperty = property.replace(/-([a-z])/g, (g) =>
        g[1].toUpperCase()
      );
      styles[camelProperty] = value;
    });
  return styles;
};

// Convert style object to CSS string
const parseStyles = (styles) => {
  try {
    const formatted = Object.entries(styles).map(([key, value]) => {
      // Convert camelCase to kebab-case
      const property = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      return `${property}: ${value};`;
    });
    return formatted.join("\n");
  } catch (e) {
    console.error(e);
    return "";
  }
};

export { cssToStyleObject, parseStyles };
