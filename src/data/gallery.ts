export type GalleryCategory = 'photos' | 'videos';

export interface GalleryItem {
	src: string;
	thumb: string;
	alt: string;
	category: GalleryCategory;
}

export const GALLERY_ITEMS: GalleryItem[] = [
	{ src: '/images/gallery/foto1.jpeg', thumb: '/images/gallery/foto1.jpeg', alt: 'Comunidad Arhuaca en Gwimake', category: 'photos' },
	{ src: '/images/gallery/foto2.jpeg', thumb: '/images/gallery/foto2.jpeg', alt: 'Sierra Nevada de Santa Marta', category: 'photos' },
	{ src: '/images/gallery/foto3.jpeg', thumb: '/images/gallery/foto3.jpeg', alt: 'Naturaleza en el territorio', category: 'photos' },
	{ src: '/images/gallery/foto4.jpeg', thumb: '/images/gallery/foto4.jpeg', alt: 'Paisaje de Gwimake', category: 'photos' },
	{ src: '/images/gallery/foto5.jpeg', thumb: '/images/gallery/foto5.jpeg', alt: 'Vida en Gwimake', category: 'photos' },
	{ src: '/images/gallery/foto6.jpeg', thumb: '/images/gallery/foto6.jpeg', alt: 'Paisaje de montaña', category: 'photos' },
	{ src: '/images/gallery/foto7.jpeg', thumb: '/images/gallery/foto7.jpeg', alt: 'Historias desde Gwimake', category: 'photos' },
	{ src: '/images/gallery/foto8.jpeg', thumb: '/images/gallery/foto8.jpeg', alt: 'Cultura Arhuaca', category: 'photos' },
	{ src: '/images/gallery/foto9.jpeg', thumb: '/images/gallery/foto9.jpeg', alt: 'Naturaleza de la Sierra Nevada', category: 'photos' },
	{ src: '/images/gallery/foto10.jpeg', thumb: '/images/gallery/foto10.jpeg', alt: 'Sierra Nevada', category: 'photos' },
	{ src: '/images/gallery/foto11.jpeg', thumb: '/images/gallery/foto11.jpeg', alt: 'Historias desde Gwimake', category: 'photos' },
	{ src: '/images/gallery/foto12.jpeg', thumb: '/images/gallery/foto12.jpeg', alt: 'Sierra Nevada de Santa Marta', category: 'photos' },
	{ src: '/images/gallery/foto13.jpeg', thumb: '/images/gallery/foto13.jpeg', alt: 'Naturaleza del territorio', category: 'photos' },
	{ src: '/images/gallery/foto14.jpeg', thumb: '/images/gallery/foto14.jpeg', alt: 'Comunidad Arhuaca', category: 'photos' },
	{ src: '/images/gallery/foto15.jpeg', thumb: '/images/gallery/foto15.jpeg', alt: 'Gwimake', category: 'photos' },
	{ src: '/images/gallery/foto16.jpeg', thumb: '/images/gallery/foto16.jpeg', alt: 'Paisaje del territorio', category: 'photos' },
	{ src: '/images/gallery/foto17.jpeg', thumb: '/images/gallery/foto17.jpeg', alt: 'Memoria del territorio', category: 'photos' },
	{ src: '/images/gallery/foto18.jpeg', thumb: '/images/gallery/foto18.jpeg', alt: 'Cultura Arhuaca', category: 'photos' },
	{ src: '/images/gallery/foto20.jpeg', thumb: '/images/gallery/foto20.jpeg', alt: 'Sierra Nevada', category: 'photos' },
	{ src: '/images/gallery/foto21.jpeg', thumb: '/images/gallery/foto21.jpeg', alt: 'Historias desde Gwimake', category: 'photos' },
	{ src: '/images/gallery/foto22.jpeg', thumb: '/images/gallery/foto22.jpeg', alt: 'Gwimake', category: 'photos' },
	{ src: '/videos/video3.mp4', thumb: '/images/gallery/foto-video3.png', alt: 'Video desde Gwimake', category: 'videos' },
	{ src: '/videos/video4.mp4', thumb: '/images/gallery/foto-video4.png', alt: 'Video desde Gwimake', category: 'videos' },
	{ src: '/videos/video5.mp4', thumb: '/images/gallery/foto-video5.png', alt: 'Video desde Gwimake', category: 'videos' },
];
