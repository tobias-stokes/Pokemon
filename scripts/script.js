const container = document.getElementById('container');
        const numOfPokemon = 152;
        const typeColours = {
            fire:       '#FDDFDF',
            grass:      '#DEFDE0',
            electric:   '#FCF7DE',
            water:      '#DEF3FD',
            ground:     '#f4e7da',
            rock:       '#d5d5d4',
            fairy:      '#fceaff',
            poison:     '#98d7a5',
            bug:        '#f8d5a3',
            dragon:     '#97b3e6',
            psychic:    '#eaeda1',
            flying:     '#F5F5F5',
            fighting:   '#E6E0D4',
            normal:     '#F5F5F5'
        };
        const mainTypes = Object.keys(typeColours);

        const pokemonNum = async () => {
            for (let i = 1; i < numOfPokemon; i++) {
                await fetchPokemon(i);
            }
        };

        const fetchPokemon = async id => {
            const apiUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
                const response = await fetch(apiUrl);
                const pokemon = await response.json();
                    pokemonIndex(pokemon);
        };

        function pokemonIndex(i) {
            const pokemonElement = document.createElement('div');
                pokemonElement.classList.add('pokemon');
            const pokemonTypes = i.types.map(el => el.type.name);
            const type = mainTypes.find(type => pokemonTypes.indexOf(type) > -1);
            const pokeName = i.name[0].toUpperCase() + i.name.slice(1);
            const colour = typeColours[type];
                pokemonElement.style.backgroundColor = colour;

            const data = `
                <div class='imgContainer'>
                    <img src='https://pokeres.bastionbot.org/images/pokemon/${i.id}.png'/>
                </div>
                <div class='info'>
                    <span class='number'>#${i.id.toString().padStart(3, '0')}</span>
                    <h3 class='name'>${pokeName}</h3>
                    <small class='type'>Type: <span>${type}</span>
                </div>
            `;

                pokemonElement.innerHTML = data;
                container.appendChild(pokemonElement);
        }
        
        pokemonNum();