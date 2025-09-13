const SunIcon = ({ className, variant }: { className?: string; variant?: 'light' | 'dark' }) => (
    <svg className={`${className || ''}`} width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.45972 1.61691V3.19353M9.45972 15.8064V17.383M3.15327 9.49998H1.57666M4.97751 5.01776L3.86267 3.90292M13.9419 5.01776L15.0568 3.90292M4.97751 13.9854L3.86267 15.1003M13.9419 13.9854L15.0568 15.1003M17.3428 9.49998H15.7662M13.4013 9.49998C13.4013 11.6768 11.6366 13.4415 9.45972 13.4415C7.28288 13.4415 5.51819 11.6768 5.51819 9.49998C5.51819 7.32313 7.28288 5.55845 9.45972 5.55845C11.6366 5.55845 13.4013 7.32313 13.4013 9.49998Z" stroke="#404A5D" strokeWidth="2.36492" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

export default SunIcon;