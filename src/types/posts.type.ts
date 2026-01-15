export type InstagramPostProps ={
    id:string
    media_type:'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'  //corrected typo from 'CAROSEL_ALBUM' to 'CAROUSEL_ALBUM'
    media_url:string
    timestamp:Date
    caption?:string
}