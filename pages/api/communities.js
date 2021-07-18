import { SiteClient } from 'datocms-client';

export default async function communityController (request, response) {
    if (request.method === 'POST') {
        const TOKEN = '7fb8d2390e1c9ce4e49c0a2ce2a9bf';
        const client = new SiteClient(TOKEN);

        const registerCreated = await client.items.create({
            itemType: "975156",
            ...request.body,
            // title: "OPEX",
            // imageUrl: "https://onepieceex.net/wp-content/uploads/2020/06/opex_franky-1.png.webp",
            // creatorSlug: "tiagowx"
        })

        console.log(registerCreated); 

        response.json({
            datas: '',
            registerCreated: registerCreated
        });
        return;
    }
    response.status(404).json({
        message:"Não existe returno 'GET' nessa requisição, apenas 'POST'."
    })
}