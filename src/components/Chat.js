import React from "react";

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
  const n = Math.floor(Math.random() * 0xfffff * 1000000).toString(16); //pomnožili smo s 100000, sad da je 9 znamenki što nije bilo nužno, moglo je i s 10, na kraju smo odrezali prvih 6 znamenki, iz nekog razloga Scaledronova formula je nekad bacala samo 5 znamenki
  console.log(n);
  return "#" + n.slice(0, 6);
}

class Chat extends React.Component {
  state = {
    message: "",
    messages: [],
    member: {
      username: randomName(),
      color: randomColor(),
    },
  };

  componentDidMount() {
    console.log("hello");
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
      console.log("1,2,3", message);
      const allMessages = [...this.state.messages];
      allMessages.push({
        member: { id: member.id, ...member.clientData },
        message,
      });
      this.setState({ messages: allMessages });
      this.setState({ message: "" }); //vraćam input na prazno
    });
  }
  componentWillUnmount() {
    this.drone.close();
  }
  onSendMessage = () => {
    this.drone.publish({
      room: "observable-Noela's-room",
      message: this.state.message,
    });
    console.log(this.state.messages);
  };
  onKeyPress = (e) => {
    //stvaram novu funkciju koju koristim za slanje poruke s enterom
    if (e.key === "Enter") {
      this.onSendMessage();
    }
  };

  render() {
    // console.log("messages", this.state.messages);
    return (
      <div>
        {this.state.messages.map((item, index) => (
          <div key={index} className="messages-wrapper">
            {item.member.id === this.state.member.id ? (
              <div className="my-message-container">
                <div className="user-container">
                  <div
                    className="avatar"
                    style={{ backgroundColor: item.member.color }}
                  ></div>
                  <p className="username">{item.member.username}</p>
                </div>
                <p className="my-message">{item.message}</p>
              </div>
            ) : (
              <div className="client-message-container">
                <div className="user-container">
                  <div
                    className="avatar"
                    style={{ backgroundColor: item.member.color }}
                  ></div>
                  <p className="username">{item.member.username}</p>
                </div>
                <p className="client-message">{item.message}</p>
              </div>
            )}
          </div>
        ))}
        <div className="input-container">
          <input
            type="text"
            value={this.state.message}
            onChange={(e) => this.setState({ message: e.target.value })}
            onKeyPress={this.onKeyPress}
            placeholder="Write a message..."
            autoFocus
          />
          <button onClick={this.onSendMessage}>Send</button>
        </div>
      </div>
    );
  }
}

export default Chat;