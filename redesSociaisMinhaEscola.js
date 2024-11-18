import { criarGrafico, getCSS, incluirTexto } form "./common.js"

async function redesSociaisFavoritasMinhaEscola() {
    const dadosLocaisSting = localStorage.getItem('respostaRedeSociais')
    if(dadosLocaisSting) {
      const dadosLocais = JSON.parse(dadosLocaisSting)
      processarDados(dadosLocais)
    } else {
        const url = 'https://script.googleusercontent.com/macros/echo?user_content_key=rSe23zaQC7gOvWgFJbdtPaqh7ewsO5hQmusYOeqdorTRN8C25vVV3BicsPo6HS3jnJY9NNhy_pNZj6prQdxDH3305Mro8vNm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1nSncGQajx_ryfhECjZEnPvESZ9fvnAeFWqfIvIacdoRZcVMZ-nDSydw9_0gseo2TN3y60rOTtwDBCYnKQf6yIqgf8yOzNfccjP633C9VnHmUmPZvRBJY9z9Jw9Md8uu&lib=MCARBaBtNBMHKiEwMeRap3j6V_G7SlGWF'
        const res = await fetch(url) 
        const dados = await res.json()
        localStorage.setItem('respostaRedeSociais', JSON.stringify(dados))
        processarDados(dadosLocais)
    }
}
 
function processarDados(dados) {
const redesSociais = dados.slice(1).map(redes => redes[1])
 const contagemRedesSociais = redesSociais.reduce((acc, redesSociais) => {
        acc[redesSociais] = (acc[redesSociais] || 0) + 1
        return acc
    }, {})
    const valores = Object.values(contagemRedesSociais)
    const labels = Object.keys(contagemRedesSociais)

    const data = [
        {
            values: valores,
            labels: labels,
            type: 'pie',
            textinfo: 'label+percent'
        }
    ]
    

    const layout = {
        plot_bgcolor: getCSS('--bg-color'),
        paper_bgcolor: getCSS('--bg-color'),
        title: {
          text: 'Redes sociais que as pessoas da minha escola mais gostam',
           x: 0,
           font: {
               color: getCSS('--primary-color'),
               family: getCSS('--font'),
               size: 30
           }
        },
        legend: {
            font: {
                color: getCSS('--primary-color'),
                size: 16
            }
        }
}
             
criaGrafico(data, layout)
incluirTexto(`Como no mundo, a amostra de pessoas entrevistadas por mim, demonstra um apreço pelo <span>Instagram</span> em relação a outras redes`)
}

redesSociaisFavoritasMinhaEscola()