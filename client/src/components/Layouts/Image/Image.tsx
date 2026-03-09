

interface ImageProps {
  src: string
  alt: string
  width?: number | string
  height?: number | string
  className?: string
  onClick?: () => void
}


export const ImageLayout: React.FC<ImageProps> = ({ src, alt, width = '100%', height = 'auto', className = '', onClick }) => {
    return (
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
            onClick={onClick}
        />
    )
}