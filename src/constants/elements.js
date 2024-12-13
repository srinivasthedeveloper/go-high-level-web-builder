export const ELEMENT_TYPES = {
    heading: {
      type: 'heading',
      defaultProps: {
        text: 'New Heading',
        tag: 'h1',
        styles: {
          color: '#000000',
          fontSize: '24px',
          textAlign: 'left'
        }
      }
    },
    button: {
      type: 'button',
      defaultProps: {
        text: 'Click me',
        styles: {
          backgroundColor: '#007bff',
          color: '#ffffff',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '4px'
        }
      }
    },
    image: {
      type: 'image',
      defaultProps: {
        src: 'https://via.placeholder.com/300x200',
        alt: 'Image',
        styles: {
          width: '100%',
          height: 'auto'
        }
      }
    }
  };