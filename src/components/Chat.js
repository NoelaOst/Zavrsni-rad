import "../Chat.css";
import React from "react";
import Messages from "./Messages";
import Input from "./Input";

//funkcije koje trebaju biti definirane samo jednom, ne prilikom svakog rendera
function randomName() {
  const nameList = [
    "Abra",
    "Aerodactyl",
    "Alakazam",
    "Arcanine",
    "Bellossom",
    "Blissey",
    "Bulbasaur",
    "Butterfree",
    "Caterpie",
    "Charmander",
    "Chikorita",
    "Clefable",
    "Clefairy",
    "Corsola",
    "Cubone",
    "Cyndaquil",
    "Ditto",
    "Dragonair",
    "Dratini",
    "Eevee",
    "Ekans",
    "Electabuzz",
    "Electrode",
    "Entei",
    "Espeon",
    "Exeggcute",
    "Farfetch'd",
    "Fearow",
    "Flaaffy",
    "Flareon",
    "Gengar",
    "Geodude",
    "Gloom",
    "Golbat",
    "Golduck",
    "Gyarados",
    "Haunter",
    "Hitmonchan",
    "Ho-Oh",
    "Hoothoot",
    "Horsea",
    "Jigglypuff",
    "Jolteon",
    "Kabuto",
    "Kadabra",
    "Kangaskhan",
    "Kingler",
    "Koffing",
    "Lapras",
    "Larvitar",
    "Lickitung",
    "Magikarp",
    "Magmar",
    "Magnemite",
    "Mareep",
    "Marill",
    "Mew",
    "Mewtwo",
    "Moltres",
    "Mudkip",
    "Natu",
    "Nidoking",
    "Nidoqueen",
    "Nidoran♀",
    "Nidoran♂",
    "Nidorina",
    "Nidorino",
    "Oddish",
    "Omanyte",
    "Onix",
    "Pidgeot",
    "Pikachu",
    "Poliwhirl",
    "Ponyta",
    "Psyduck",
    "Raichu",
    "Rapidash",
    "Scyther",
    "Seadra",
    "Seaking",
    "Squirtle",
    "Starmie",
    "Sudowoodo",
    "Tauros",
    "Tentacool",
    "Togepi",
    "Totodile",
    "Typhlosion",
    "Umbreon",
    "Vaporeon",
    "Venusaur",
    "Voltorb",
    "Vulpix",
    "Wartortle",
    "Wigglytuff",
    "Zapdos",
  ];
  const name = nameList[Math.floor(Math.random() * nameList.length)];
  return name;
}
function randomColor() {
  const n = Math.floor(Math.random() * 0xfffff * 1000000).toString(16); //pomnožili smo s 100000, sad daje 9/10 znamenki, nakon toga režemo do 6
  console.log(n);
  return "#" + n.slice(0, 6);
}

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      member: {
        username: randomName(),
        color: randomColor(),
      },
    };
    this.drone = new window.Scaledrone("aVV3umdXEUGWDhjy", {
      data: this.state.member,
    });

    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }

      const memberCopy = { ...this.state.member };
      memberCopy.id = this.drone.clientId;
      this.setState({ member: memberCopy });
    });

    const room = this.drone.subscribe("observable-Noela's-room");

    room.on("data", (message, member) => {
      console.log("poruka je:", message);
      const allMessages = [...this.state.messages];
      allMessages.push({
        member: {
          id: member.id,
          username: member.clientData.username,
          color: member.clientData.color,
        },
        message,
      });
      this.setState({ messages: allMessages });
    });
  }

  sendMessage = (poruka) => {
    this.drone.publish({
      room: "observable-Noela's-room",
      message: poruka, //ovo je Scaledronov objekt koji mora biti nazvan message, njegov value je poruka koju šaljemo
    });
    console.log(this.state.messages);
  };

  render() {
    return (
      <div className="Chat">
        <h1 className="chat-heading">Noela's Chat Room</h1>
        <Messages member={this.state.member} messages={this.state.messages} />
        <Input sendMessage={this.sendMessage} />
      </div>
    );
  }
}

export default Chat;
