// const Title = styled.h1 `
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.primary};
// `
import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import {
    AlurakutMenu,
    AlurakutProfileSidebarMenuDefault,
    OrkutNostalgicIconSet
} from '../src/libs/AlurakutCommons';

import { ProfileRelationsBoxWrapper } from '../src/components/PeopleRelations'

function ProfileSideBar(propriedades) {

    return (
        <Box as="aside">
            <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
            <hr />
            <p>
                <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
                    @{propriedades.githubUser}
                </a>
            </p>
            <hr />
            <AlurakutProfileSidebarMenuDefault />

        </Box>
    )
}

function ProfileRelationBox(propriedades) {
    return (
        <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">{propriedades.title} ({propriedades.items.length})</h2>
            <ul>
                {/* {items.map((currentItems)=>{
                    return (
                        <li key={currentItems.id}>
                            <a href={`/users/${currentItems.title}`} key={currentItems.title} >  
                                <img src={currentItems.image} />
                                <span>{ currentItems.title }</span>
                            </a>
                        </li>
                    );
                })}  */}
            </ul>
        </ProfileRelationsBoxWrapper>
    )
}

export default function Home() {
    const [communities, setCommunities] = React.useState([]);
    console.log(communities);
    const usuarioAleatorio = `tiagowx`;
    //const communities = ['alurakut'];
    const pessoasFavoritas = [
        'juunegreiros',
        'omariosouto',
        'peas',
        'rafaballerini',
        'marcobrunodev',
        'felipefialho'
    ]

    // 0 - Pegar o array de dados do Github
    const [followers, setFollowers] = React.useState([]);

    React.useEffect(function () {
        //GET
        fetch('https://api.github.com/users/tiagowx/followers')
            .then(function (responseFromServer) {
                return responseFromServer.json();
            }).then(function (responseComplete) {
                setFollowers(responseComplete);
            });

        fetch('https://graphql.datocms.com/', {
            method: 'POST',
            headers: {
                'Authorization': '0e18553f8ce24b937ddd149ea614b4',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ "query": ` query {
                allCommunities {
                  id
                  title
                  imageUrl
                  creatorSlug
                }
            } ` })
        })
        .then((response) => response.json()) // arrow function direto para resposta
        .then((fullResponse) => {
            const c = fullResponse.data.allCommunities;
            console.log(c)
            setCommunities (c)
        })
    }, [])


    // 1 - Criar um box com um map, baseado nos itens do array do Github



    return (
        <>
            <AlurakutMenu />
            <MainGrid>
                {/* <Box style="grid-area: profileArea;"> */}
                <div className="profileArea" style={{ gridArea: "profileArea" }}>
                    <ProfileSideBar githubUser={usuarioAleatorio} />
                </div>

                <div style={{ gridArea: "welcomeArea" }}>
                    <Box>
                        <h1>Bem vindo (a)</h1>

                        <OrkutNostalgicIconSet />

                    </Box>

                    <Box>
                        <h2 className="subTitle">O que você deseja fazer?</h2>
                        <form onSubmit={function handleCreateCommunities(e) {
                            e.preventDefault();
                            const dataOfForm = new FormData(e.target);

                            // console.log ('Campo: ', dataOfForm.get('title'));
                            // console.log ('Campo: ', dataOfForm.get('image'));

                            const community = {
                                //id: new Date().toISOString(),
                                title: dataOfForm.get('title'),
                                imageUrl: dataOfForm.get('image'),
                                creatorSlug: usuarioAleatorio
                            }

                            fetch('/api/communities', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(community)
                            })
                            .then(async (response) => {
                                const datas = await response.json();
                                console.log(datas.registerCreated);
                                const community = datas.registerCreated;
                                const communitiesRefresh = [...communities, community];
                                setCommunities(communitiesRefresh);
                            })

                        }}>
                            <div>
                                <input
                                    placeholder="Qual o nome da sua comunidade?"
                                    name="title"
                                    aria-label="Qual o nome da sua comunidade?"
                                    type="text"
                                />
                            </div>
                            <div>
                                <input
                                    placeholder="Coloque a URL da capa"
                                    name="image"
                                    aria-label="Coloque a URL da capa"
                                />
                            </div>
                            <button>
                                Criar Comunidade
                            </button>

                        </form>
                    </Box>
                </div>
                <div className="profileRelationsArea" style={{ gridArea: "profileRelationsArea" }}>

                    <ProfileRelationBox title="Seguidores" items={followers} />

                    <ProfileRelationsBoxWrapper>
                        <h2 className="smallTitle">Comunidades ({communities.length})</h2>
                        <ul>
                            {communities.map((currentCommunity) => {
                                return (
                                    <li key={currentCommunity.id}>
                                        <a href={`/communities/${currentCommunity.id}`} key={currentCommunity.title} >
                                            <img src={currentCommunity.imageUrl} />
                                            <span>{currentCommunity.title}</span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </ProfileRelationsBoxWrapper>
                    <ProfileRelationsBoxWrapper>
                        <h2 className="smallTitle">Pessoas Favoritas ({pessoasFavoritas.length})</h2>

                        <ul>
                            {pessoasFavoritas.map((currentPeople) => {
                                return (
                                    <li key={currentPeople}>
                                        <a href={`https://github.com//${currentPeople}`}>
                                            <img src={`https://github.com/${currentPeople}.png`} />
                                            <span>{currentPeople}</span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>

                    </ProfileRelationsBoxWrapper>
                </div>
            </MainGrid>
        </>
    )
}