import Post from '../models/dummy-post';
import Group from '../models/dummy-group';
import Group2 from '../models/dummy-group2';

export const DUMMYPOST = [
    new Post(
        1,
        'Dimagiba Family',
        'Family',
        'YOU',
        'Just now',
        'Hello fam, how are you all? Stay safe my children! Gigi, ingat pauwi your mom’s worried. Love u all!',
        null,
        0,
        0
    ),

    new Post(
        2,
        'College of Architecture 2020',
        'University of Sto. Tomas',
        'loymontero',
        '5 seconds ago',
        'The fine architecture of our school’s main building is such a sight to behold! Truly breathtaking whenever I pass by it from time to time going to my other classes.',
        require('../assets/images/img-1.png'),
        176,
        32
    ),

    new Post(
        3,
        'Gunpla Singapore',
        'Community',
        'toymakerinc',
        '3 minutes ago',
        'Gunpla Builders World Cup (GBWC) 2012 Singapore - The-O [codename Odin]',
        require('../assets/images/img-2.png'),
        6187,
        882
    ),

    new Post(
        4,
        'Boglads',
        'Friends',
        'eugeneceriola',
        '7 hours ago',
        'Them boys getting ready for the year-end party later tonight! Who’s missing? Tag ‘em below and let’s take another photo!',
        require('../assets/images/img-3.png'),
        54,
        13
    ),
]

export const DUMMYGROUP = [
    new Group (
        1,
        'Department of Tourism',
        'Government Agency',
        'DOTph',
        'The official Moppet Page of the Department of Tourism of the Philippines.',
        require('../assets/images/discover-img-1.png')
    ),

    new Group (
        2,
        'Succulents and Cacti Tent',
        'Community',
        'platiers',
        'A group for succulents/cacti (or any plants actually) enthusiasts and hobbyists.',
        require('../assets/images/discover-img-1.png')
    )
]

export const DUMMYGROUP2 = [
    new Group2 (
        1,
        'Boglads',
        require('../assets/images/group-img-1.png')
    ),

    new Group2 (
        2,
        'College of Architecture 2020',
        require('../assets/images/group-img-2.png')
    ),

    new Group2 (
        3,
        'Dimagiba Family',
        require('../assets/images/group-img-3.png')
    ),

    new Group2 (
        4,
        'Gunpla Singapore',
        require('../assets/images/group-img-4.png')
    ),

    new Group2 (
        5,
        'Plantyuhins Manila',
        require('../assets/images/group-img-5.png')
    )
]