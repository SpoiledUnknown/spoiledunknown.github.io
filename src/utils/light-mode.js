function TurnLightModeOn()
{
    const themeToggleButtons = document.querySelectorAll('#theme-toggle')
    const sunIcon = document.querySelector('.header__sun')
    const moonIcon = document.querySelector('.header__moon')

    //state
    const theme = localStorage.getItem('theme')

    //on website-load
    if (theme != null)
    {
        document.body.classList.toggle('light-mode')
        sunIcon.style.display = 'none'
        moonIcon.style.display = 'block'
    }

    //handlers
    const handleThemeToggle = () => 
    {
        document.body.classList.toggle('light-mode')
        if (document.body.classList.contains('light-mode'))
        {
            sunIcon.style.display = 'none'
            moonIcon.style.display = 'block'
            localStorage.setItem('theme','light-mode')
        }
        else
        {
            sunIcon.style.display = 'block'
            moonIcon.style.display = 'none'
            localStorage.removeItem('theme')
            document.body.removeAttribute('class')
        }
    }

    //Events
    themeToggleButtons.forEach (btn => {
        btn.addEventListener('click', handleThemeToggle)
    })
}

export default TurnLightModeOn