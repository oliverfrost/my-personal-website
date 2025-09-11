const SeoIcon = ({ className, variant }: { className?: string; variant?: 'light' | 'dark' }) => (
    <svg className={`${className || ''}`} width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.7781 1.50049H1.88437C1.39595 1.50049 1 1.89644 1 2.38486V17.9461C1 18.4345 1.39595 18.8305 1.88437 18.8305H21.7781C22.2666 18.8305 22.6625 18.4345 22.6625 17.9461V2.38486C22.6625 1.89644 22.2666 1.50049 21.7781 1.50049Z" stroke="#404A5D" strokeWidth="1.8" />
    </svg>
)

export default SeoIcon;
