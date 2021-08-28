const images: any = {
  ssh_yablonev:
    'https://sun9-53.userapi.com/impf/ideqW7kBuK7fyisKI4MbQiOz3ISPdPCTMC3BcQ/Ug6GziyQlX0.jpg?size=1500x1125&quality=96&sign=c0a1f6f6c54c77052957722ffa31b893&type=album',
  yablonev_imac: 'https://sun9-44.userapi.com/c848620/v848620007/e1500/Mz8uoenRq2g.jpg',
  ssh_lucky:
    'https://sun9-65.userapi.com/impg/EFC4pznHe4qR8FcuRFw8HiM9H-R8ScqNzihkkA/0ElKygLevzA.jpg?size=1280x853&quality=96&sign=c2ec8ae08ad12785de9778d83b94ec05&type=album'
};

export function customStuff(type: any) {
  (document.querySelector('.terms_terms') as HTMLInputElement).style.backgroundImage = `url(${images[type]}`;
}
