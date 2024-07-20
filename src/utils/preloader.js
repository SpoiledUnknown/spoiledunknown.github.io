function HandlePreloading() {
    const preloader = document.querySelector('.preloader')
    document.body.style.overflowY = 'hidden'

    window.addEventListener('load', () => {
        document.body.style.overflowY = 'auto'
        preloader.style.display = 'none'
    })
}

export default HandlePreloading

