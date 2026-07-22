/**
 * Ankabasi — blog entries metadata
 */
const BLOG_POSTS = [
    {
        slug: 'los-sabios-de-la-montana',
        date: '2026-05-20',
        featuredImage: '../images/blog/DSC09240.jpg',
        images: [
            '../images/blog/DSC09240.jpg',
            '../images/gallery/foto1.jpeg',
            '../images/blog/DSC09370.jpg',
            '../images/blog/DSC09318.jpg',
            '../images/gallery/foto9.jpeg',
        ],
    },
    {
        slug: 'donachwi-y-su-entorno',
        date: '2026-05-08',
        featuredImage: '../images/blog/DSC09322.jpg',
        images: [
            '../images/blog/DSC09322.jpg',
            '../images/blog/DSC09326.jpg',
            '../images/gallery/foto2.jpeg',
            '../images/gallery/foto4.jpeg',
            '../images/gallery/foto14.jpeg',
        ],
    },
];

/** Paths relative to site root (for index.html) */
const BLOG_POSTS_HOME = BLOG_POSTS.map(function (post) {
    return Object.assign({}, post, {
        featuredImage: post.featuredImage.replace('../', ''),
        images: post.images.map(function (img) {
            return img.replace('../', '');
        }),
    });
});
