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

import {ProfileRelationsBoxWrapper} from '../src/components/PeopleRelations'

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

export default function Home() {
    const [communities, setCommunities] = React.useState([{
        id: '789654231',
        title: 'Eu Odeio Acordar Cedo',
        image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
    }]);
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
                                id: new Date().toISOString(),
                                title: dataOfForm.get('title'),
                                image: dataOfForm.get('image')
                            }

                            //communities.push(`Alura Stars`);
                            const communitiesRefresh = [...communities, community];
                            setCommunities(communitiesRefresh);
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
                    <ProfileRelationsBoxWrapper>
                        <h2 className="smallTitle">Comunidades ({communities.length })</h2>
                        <ul>
                            {communities.map((currentCommunity)=>{
                                return (
                                    <li key={currentCommunity.id}>
                                        <a href={`/users/${currentCommunity.title}`} key={currentCommunity.title} >  
                                            <img src={currentCommunity.image} />
                                            <span>{ currentCommunity.title }</span>
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
                                            <span>{ currentPeople }</span>
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