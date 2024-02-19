export function ArrowCarousel(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", color:"black", backgroundColor:"#0B7077" ,borderRadius:"100px" }}
        onClick={onClick}
      />
    );
  }
  