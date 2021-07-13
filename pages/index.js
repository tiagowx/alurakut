// const Title = styled.h1 `
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.primary};
// `

import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/MainGrid/Box';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/libs/AlurakutCommons';
import {ProfileRelationsBoxWrapper} from '../src/components/MainGrid/Box/PeopleRelations'

function ProfileSideBar(propriedades) {
    console.log(propriedades)
    return (
        <Box>
            <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
        </Box>
    )
}

export default function Home() {
    const usuarioAleatorio = `tiagowx`;
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
                <div style={{ gridArea: "profileArea" }}>
                    <ProfileSideBar githubUser={usuarioAleatorio} />
                </div>

                <div style={{ gridArea: "welcomeArea" }}>
                    <Box>
                        <h1>Bem vindo (a)</h1>

                        <OrkutNostalgicIconSet />
                        
                    </Box>
                </div>
                <div style={{ gridArea: "profileRelactionsArea" }}>
                    <ProfileRelationsBoxWrapper>
                        <h2 className="smallTitle">Pessoas Favoritas ({pessoasFavoritas.length})</h2>
                        
                        <ul>
                            {pessoasFavoritas.map((currentPeople) => {
                                return (
                                    <li>
                                        <a href={`/users/${currentPeople}`}>  
                                            <img src={`https://github.com/${currentPeople}.png`} />
                                            <span>{ currentPeople }</span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                        
                    </ProfileRelationsBoxWrapper>
                    <Box>
                        Comunidades
                    </Box>
                </div>
            </MainGrid>
        </>
    )
}