# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

winterblack = User.create({
  username: "winterblack",
  password_digest: BCrypt::Password.create("password"),
  session_token: SecureRandom.base64
})

boardgame_collection = Collection.create({title: "Board Games", user_id: winterblack.id})

characteristic_names = [
  "Year Published",
  "BGG Rating",
  "Weight",
  "Average Time",
  "Max Players",
  "Designer"
]

characteristic_names.each do |name|
  Characteristic.create(name: name, collection_id: boardgame_collection.id)
end

boardgames = [
  {
    title: "Pandemic Legacy",
    image_url: "https://cf.geekdo-images.com/images/pic2452831_md.png",
    year: "2015",
    rating: "84",
    weight: "2",
    time: "60",
    players: "4",
    designer: "Matt Leacock"
  },
  {
    title: "Twilight Struggle",
    image_url: "https://cf.geekdo-images.com/images/pic361592_md.jpg",
    year: "2005",
    rating: "82",
    weight: "3",
    time: "180",
    players: "2",
    designer: "various"
  },
  {
    title: "Terra Mystica",
    image_url: "https://cf.geekdo-images.com/images/pic1356616_md.jpg",
    year: "2012",
    rating: "81",
    weight: "3",
    time: "105",
    players: "5",
    designer: "various"
  },
  {
    title: "Puerto Rico",
    image_url: "https://cf.geekdo-images.com/images/pic158548_md.jpg",
    year: "2002",
    rating: "80",
    weight: "3",
    time: "120",
    players: "5",
    designer: "Andreas Seyfarth"
  },
  {
    title: "Agricola",
    image_url: "https://cf.geekdo-images.com/images/pic259085_md.jpg",
    year: "2007",
    rating: "80",
    weight: "3",
    time: "90",
    players: "5",
    designer: "Uwe Rosenberg"
  },
  {
    title: "The Castles of Burgundy",
    image_url: "https://cf.geekdo-images.com/images/pic1176894.jpg",
    year: "2011",
    rating: "80",
    weight: "3",
    time: "60",
    players: "4",
    designer: "Stefan Feld"
  },
  {
    title: "7 Wonders Duel",
    image_url: "https://cf.geekdo-images.com/images/pic2576399_md.jpg",
    year: "2015",
    rating: "80",
    weight: "2",
    time: "30",
    players: "2",
    designer: "Antoine Bauza"
  },
  {
    title: "Star Wars: Rebellion",
    image_url: "https://cf.geekdo-images.com/images/pic2737530_md.png",
    year: "2016",
    rating: "80",
    weight: "3",
    time: "210",
    players: "2",
    designer: "Corey Konieczka"
  },
  {
    title: "Star Wars: Imperial Assault",
    image_url: "https://cf.geekdo-images.com/images/pic2247647_md.jpg",
    year: "2014",
    rating: "79",
    weight: "3",
    time: "90",
    players: "5",
    designer: "Corey Konieczka"
  },
  {
    title: "War of the Ring",
    image_url: "https://cf.geekdo-images.com/images/pic1215633_md.jpg",
    year: "2012",
    rating: "79",
    weight: "3",
    time: "150",
    players: "4",
    designer: "various"
  },
  {
    title: "Eclipse",
    image_url: "https://cf.geekdo-images.com/images/pic1974056_md.jpg",
    year: "2011",
    rating: "79",
    weight: "3",
    time: "130",
    players: "6",
    designer: "Touko Tahkokallio"
  },
  {
    title: "Power Grid",
    image_url: "https://cf.geekdo-images.com/images/pic173153_md.jpg",
    year: "2004",
    rating: "79",
    weight: "3",
    time: "120",
    players: "6",
    designer: "Friedemann Friese"
  },
  {
    title: "Blood Rage",
    image_url: "https://cf.geekdo-images.com/images/pic2439223_md.jpg",
    year: "2015",
    rating: "79",
    weight: "2",
    time: "75",
    players: "4",
    designer: "Eric Lang"
  },
  {
    title: "Codenames",
    image_url: "https://cf.geekdo-images.com/images/pic2582929_md.jpg",
    year: "2015",
    rating: "79",
    weight: "1",
    time: "20",
    players: "8",
    designer: "Vlaada Chvatil"
  },
  {
    title: "Scythe",
    image_url: "https://cf.geekdo-images.com/images/pic2323719_md.jpg",
    year: "2016",
    rating: "79",
    weight: "3",
    time: "105",
    players: "5",
    designer: "Jamey Stegmaier"
  },
  {
    title: "Robinson Crusoe",
    image_url: "https://cf.geekdo-images.com/images/pic1413154_md.jpg",
    year: "2012",
    rating: "79",
    weight: "3",
    time: "130",
    players: "4",
    designer: "Ignacy Trzewiczek"
  },
  {
    title: "Brass",
    image_url: "https://cf.geekdo-images.com/images/pic261878_md.jpg",
    year: "2007",
    rating: "78",
    weight: "3",
    time: "150",
    players: "4",
    designer: "Martin Wallace"
  },
  {
    title: "Dead of Winter",
    image_url: "https://cf.geekdo-images.com/images/pic3016500_md.jpg",
    year: "2014",
    rating: "78",
    weight: "2",
    time: "130",
    players: "5",
    designer: "various"
  },
  {
    title: "Time Stories",
    image_url: "https://cf.geekdo-images.com/images/pic2617634_md.png",
    year: "2015",
    rating: "78",
    weight: "2",
    time: "90",
    players: "4",
    designer: "various"
  },
  {
    title: "7 Wonders",
    image_url: "https://cf.geekdo-images.com/images/pic860217_md.jpg",
    year: "2010",
    rating: "78",
    weight: "2",
    time: "30",
    players: "7",
    designer: "Antoine Bauza"
  },
  {
    title: "Eldritch Horror",
    image_url: "https://cf.geekdo-images.com/images/pic1872452_md.jpg",
    year: "2013",
    rating: "77",
    weight: "3",
    time: "180",
    players: "8",
    designer: "Corey Konieczka"
  },
  {
    title: "Roll for the Galaxy",
    image_url: "https://cf.geekdo-images.com/images/pic1473629_md.jpg",
    year: "2014",
    rating: "77",
    weight: "2",
    time: "45",
    players: "5",
    designer: "Thomas Lehman"
  },
  {
    title: "Dominion: Intrigue",
    image_url: "https://cf.geekdo-images.com/images/pic460011_md.jpg",
    year: "2009",
    rating: "77",
    weight: "2",
    time: "45",
    players: "5",
    designer: "Donald X. Vaccarino"
  },
  {
    title: "Race for the Galaxy",
    image_url: "https://cf.geekdo-images.com/images/pic236327.jpg",
    year: "2007",
    rating: "77",
    weight: "2",
    time: "45",
    players: "4",
    designer: "Thomas Lehman"
  },
  {
    title: "Patchwork",
    image_url: "https://cf.geekdo-images.com/images/pic2270442_md.jpg",
    year: "2014",
    rating: "77",
    weight: "1",
    time: "20",
    players: "2",
    designer: "Uwe Rosenberg"
  },
  {
    title: "Lords of Waterdeep",
    image_url: "https://cf.geekdo-images.com/images/pic1116080_md.jpg",
    year: "2012",
    rating: "77",
    weight: "2",
    time: "90",
    players: "5",
    designer: "various"
  },
  {
    title: "Five Tribes",
    image_url: "https://cf.geekdo-images.com/images/pic2055255_md.jpg",
    year: "2014",
    rating: "77",
    weight: "2",
    time: "60",
    players: "4",
    designer: "Bruno Cathala"
  },
  {
    title: "Battlestar Galactica",
    image_url: "https://cf.geekdo-images.com/images/pic354500_md.jpg",
    year: "2008",
    rating: "77",
    weight: "3",
    time: "180",
    players: "6",
    designer: "Corey Konieczka"
  },
  {
    title: "Tigris & Euphrates",
    image_url: "https://cf.geekdo-images.com/images/pic2338267_md.jpg",
    year: "1997",
    rating: "76",
    weight: "3",
    time: "90",
    players: "4",
    designer: "Reiner Knizia"
  },
  {
    title: "Castles of Mad King Ludwig",
    image_url: "https://cf.geekdo-images.com/images/pic1961827_md.jpg",
    year: "2014",
    rating: "76",
    weight: "2",
    time: "90",
    players: "4",
    designer: "Ted Alspach"
  },
  {
    title: "The Resistance: Avalon",
    image_url: "https://cf.geekdo-images.com/images/pic1398895_md.jpg",
    year: "2012",
    rating: "76",
    weight: "1",
    time: "30",
    players: "10",
    designer: "Don Eskridge"
  },
  {
    title: "Pandemic",
    image_url: "https://cf.geekdo-images.com/images/pic1534148_md.jpg",
    year: "2008",
    rating: "76",
    weight: "2",
    time: "45",
    players: "4",
    designer: "Matt Leacock"
  },
  {
    title: "Sherlock Holmes Consulting Detective",
    image_url: "https://cf.geekdo-images.com/images/pic1977064_md.jpg",
    year: "1981",
    rating: "76",
    weight: "2",
    time: "90",
    players: "8",
    designer: "various"
  },
  {
    title: "Legendary Encounters: Alien",
    image_url: "https://cf.geekdo-images.com/images/pic2225180_md.jpg",
    year: "2014",
    rating: "76",
    weight: "2",
    time: "45",
    players: "5",
    designer: "various"
  },
  {
    title: "Stone Age",
    image_url: "https://cf.geekdo-images.com/images/pic1632539_md.jpg",
    year: "2008",
    rating: "75",
    weight: "2",
    time: "75",
    players: "4",
    designer: "Bernd Brunnhofer"
  },
  {
    title: "Star Realms",
    image_url: "https://cf.geekdo-images.com/images/pic1903816_md.jpg",
    year: "2014",
    rating: "75",
    weight: "1",
    time: "20",
    players: "2",
    designer: "various"
  },
  {
    title: "Ticket to Ride: Europe",
    image_url: "https://cf.geekdo-images.com/images/pic66668_md.jpg",
    year: "2005",
    rating: "75",
    weight: "1",
    time: "45",
    players: "5",
    designer: "Alan Moon"
  },
  {
    title: "Cosmic Encounters",
    image_url: "https://cf.geekdo-images.com/images/pic1521633_md.jpg",
    year: "2008",
    rating: "75",
    weight: "2",
    time: "90",
    players: "5",
    designer: "various"
  },
  {
    title: "Splendor",
    image_url: "https://cf.geekdo-images.com/images/pic1904079_md.jpg",
    year: "2014",
    rating: "75",
    weight: "1",
    time: "30",
    players: "4",
    designer: "Marc Andre"
  },
  {
    title: "Jaipur",
    image_url: "https://cf.geekdo-images.com/images/pic725500_md.jpg",
    year: "2009",
    rating: "74",
    weight: "1",
    time: "30",
    players: "2",
    designer: "Sebastien Pauchon"
  },
  {
    title: "Runewars",
    image_url: "https://cf.geekdo-images.com/images/pic1534815_md.jpg",
    year: "2010",
    rating: "74",
    weight: "3",
    time: "180",
    players: "4",
    designer: "Corey Konieczka"
  },
  {
    title: "Carcassonne",
    image_url: "https://cf.geekdo-images.com/images/pic2337577_md.jpg",
    year: "2000",
    rating: "73",
    weight: "1",
    time: "45",
    players: "5",
    designer: "Klaus-Jurgen Wrede"
  },
  {
    title: "Mysterium",
    image_url: "https://cf.geekdo-images.com/images/pic2601683_md.jpg",
    year: "2015",
    rating: "73",
    weight: "1",
    time: "45",
    players: "7",
    designer: "various"
  },
  {
    title: "Dixit Odyssey",
    image_url: "https://cf.geekdo-images.com/images/pic918568_md.jpg",
    year: "2011",
    rating: "73",
    weight: "1",
    time: "30",
    players: "12",
    designer: "Jean-Louis Roubira"
  },
  {
    title: "Letters from Whitechapel",
    image_url: "https://cf.geekdo-images.com/images/pic1545654_md.jpg",
    year: "2011",
    rating: "73",
    weight: "2",
    time: "120",
    players: "6",
    designer: "various"
  },
  {
    title: "Love Letter",
    image_url: "https://cf.geekdo-images.com/images/pic1401448_md.jpg",
    year: "2012",
    rating: "73",
    weight: "1",
    time: "20",
    players: "4",
    designer: "Seiji Kanai"
  },
  {
    title: "Ghost Stories",
    image_url: "https://cf.geekdo-images.com/images/pic1790243_md.jpg",
    year: "2008",
    rating: "73",
    weight: "2",
    time: "60",
    players: "4",
    designer: "Antoine Bauza"
  },
  {
    title: "Sheriff of Nottingham",
    image_url: "https://cf.geekdo-images.com/images/pic2075830_md.jpg",
    year: "2014",
    rating: "73",
    weight: "1",
    time: "60",
    players: "5",
    designer: "various"
  },
  {
    title: "Merchants & Marauders",
    image_url: "https://cf.geekdo-images.com/images/pic738119_md.jpg",
    year: "2010",
    rating: "73",
    weight: "3",
    time: "180",
    players: "4",
    designer: "various"
  },
  {
    title: "King of Tokyo",
    image_url: "https://cf.geekdo-images.com/images/pic3043734_md.jpg",
    year: "2011",
    rating: "73",
    weight: "1",
    time: "30",
    players: "6",
    designer: "Richard Garfield"
  },
  {
    title: "Takenoko",
    image_url: "https://cf.geekdo-images.com/images/pic1912529_md.jpg",
    year: "2011",
    rating: "72",
    weight: "1",
    time: "45",
    players: "4",
    designer: "Antoine Bauza"
  },
  {
    title: "Above and Below",
    image_url: "https://cf.geekdo-images.com/images/pic2398773_md.jpg",
    year: "2015",
    rating: "72",
    weight: "2",
    time: "105",
    players: "4",
    designer: "Ryan Laukat"
  },
  {
    title: "One Night Ultimate Werewolf",
    image_url: "https://cf.geekdo-images.com/images/pic1809823.jpg",
    year: "2014",
    rating: "72",
    weight: "1",
    time: "10",
    players: "10",
    designer: "Ted Alspach"
  },
  {
    title: "Mansions of Madness",
    image_url: "https://cf.geekdo-images.com/images/pic3118622_md.jpg",
    year: "2016",
    rating: "72",
    weight: "3",
    time: "120",
    players: "5",
    designer: "Corey Konieczka"
  },
  {
    title: "Survive: Escape from Atlantis",
    image_url: "https://cf.geekdo-images.com/images/pic1300182_md.png",
    year: "1982",
    rating: "72",
    weight: "1",
    time: "60",
    players: "4",
    designer: "Julian Courtland-Smith"
  },
  {
    title: "Hanabi",
    image_url: "https://cf.geekdo-images.com/images/pic2007286_md.jpg",
    year: "2010",
    rating: "72",
    weight: "1",
    time: "30",
    players: "5",
    designer: "Antoine Bauza"
  },
  {
    title: "Fury of Dracula",
    image_url: "https://cf.geekdo-images.com/images/pic2628062_md.jpg",
    year: "2015",
    rating: "71",
    weight: "3",
    time: "150",
    players: "5",
    designer: "various"
  },
  {
    title: "Deception: Murder in Hong Kong",
    image_url: "https://cf.geekdo-images.com/images/pic2568916_md.jpg",
    year: "2014",
    rating: "69",
    weight: "1",
    time: "20",
    players: "12",
    designer: "Tobey Ho"
  },
  {
    title: "Pictomania",
    image_url: "https://cf.geekdo-images.com/images/pic2360788_md.png",
    year: "2011",
    rating: "68",
    weight: "1",
    time: "60",
    players: "6",
    designer: "Vlaada Chvatil"
  },
  {
    title: "Fauna",
    image_url: "https://cf.geekdo-images.com/images/pic1091049_md.jpg",
    year: "2008",
    rating: "68",
    weight: "1",
    time: "60",
    players: "6",
    designer: "Friedemann Friese"
  },
]

year = boardgame_collection.characteristics[0]
rating = boardgame_collection.characteristics[1]
weight = boardgame_collection.characteristics[2]
time = boardgame_collection.characteristics[3]
players = boardgame_collection.characteristics[4]
designer = boardgame_collection.characteristics[5]

boardgames.each do |boardgame|
  item = Item.create({
    title: boardgame[:title],
    image_url: boardgame[:image_url],
    collection_id: boardgame_collection.id
  })
  Value.create([
    {item_id: item.id, characteristic_id: year[:id], value: boardgame[:year]},
    {item_id: item.id, characteristic_id: rating[:id], value: boardgame[:rating]},
    {item_id: item.id, characteristic_id: weight[:id], value: boardgame[:weight]},
    {item_id: item.id, characteristic_id: time[:id], value: boardgame[:time]},
    {item_id: item.id, characteristic_id: players[:id], value: boardgame[:players]},
    {item_id: item.id, characteristic_id: designer[:id], value: boardgame[:designer]}
  ])
end
