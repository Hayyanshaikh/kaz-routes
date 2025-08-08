import React from "react";

const PackageSummary: React.FC<{ data: any }> = ({ data }) => {
  if (!data) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          color: "#4B5563",
          fontSize: "1rem",
          fontWeight: 500,
        }}
      >
        Loading Summary...
      </div>
    );
  }

  const {
    name,
    tagline,
    duration,
    arrival_date,
    flight_arrival,
    flight_departure,
    adults,
    children,
    infants,
    items,
  } = data[0];

  const containerStyle = {
    border: "1px solid #E5E7EB",
    borderRadius: 8,
    padding: 24,
    fontFamily: "'Arial', sans-serif",
    display: "none",
    color: "#1F2937",
    fontSize: 14,
    maxWidth: "100%",
  };

  const sectionStyle = {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottom: "1px solid #D1D5DB",
  };

  const headerStyle = {
    fontWeight: 600,
    fontSize: 20,
    textAlign: "center" as const,
    marginBottom: 24,
    letterSpacing: "0.05em",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "8px 24px",
  };

  const labelStyle = {
    fontWeight: 600,
    padding: "4px 0",
  };

  const valueStyle = {
    padding: "4px 0",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse" as const,
    fontSize: 13,
    color: "#374151",
  };

  const thStyle = {
    backgroundColor: "#D1D5DB",
    fontWeight: 600,
    padding: "6px 8px",
    border: "1px solid #9CA3AF",
    textAlign: "left" as const,
  };

  const tdStyle = {
    padding: "6px 8px",
    border: "1px solid #ccc",
  };

  const sectionHeaderStyle = {
    fontWeight: 600,
    fontSize: 18,
    marginBottom: 16,
    borderBottom: "1px solid #9CA3AF",
    paddingBottom: 4,
  };

  const totalPriceStyle = {
    marginBottom: 16,
    textAlign: "right" as const,
    fontWeight: 600,
    fontSize: 18,
  };

  return (
    <>
      <div id="myContent" style={containerStyle}>
        <h1 style={headerStyle}>Package Invoice</h1>

        {/* Package Details */}
        <section style={sectionStyle}>
          <h2 style={sectionHeaderStyle}>Package Details</h2>
          <div style={gridStyle}>
            {[
              ["Name", name],
              ["Tagline", tagline],
              ["Duration", `${duration} days`],
              ["Arrival Date", new Date(arrival_date).toLocaleDateString()],
              ["Flight Arrival", new Date(flight_arrival).toLocaleString()],
              ["Flight Departure", new Date(flight_departure).toLocaleString()],
              ["Adults", adults],
              ["Children", children],
              ["Infants", infants],
            ].map(([label, value], idx) => (
              <React.Fragment key={idx}>
                <div style={labelStyle}>{label}</div>
                <div style={valueStyle}>{value}</div>
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Items */}
        {items.map((item: any, index: number) => (
          <section
            key={index}
            style={{
              marginBottom: 24,
              backgroundColor: "#F9FAFB",
              borderRadius: 8,
              border: "1px solid #D1D5DB",
              padding: 16,
            }}
          >
            <h2 style={sectionHeaderStyle}>Item {index + 1}</h2>

            {/* Location */}
            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
                Location
              </h3>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>City</th>
                    <th style={thStyle}>Country</th>
                  </tr>
                </thead>
                <tbody>
                  {item.cities.map((city: any) => (
                    <tr key={city.id}>
                      <td style={tdStyle}>{city.name}</td>
                      <td style={tdStyle}>
                        {
                          item.countries.find(
                            (c: any) => Number(c.id) === Number(city.country_id)
                          )?.name
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Sites */}
            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
                Sites
              </h3>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Name</th>
                    <th style={thStyle}>Duration (hrs)</th>
                    <th style={thStyle}>Price (Adult $)</th>
                  </tr>
                </thead>
                <tbody>
                  {item.sites.map((site: any) => (
                    <tr key={site.id}>
                      <td style={tdStyle}>{site.name}</td>
                      <td style={tdStyle}>{site.duration_hours}</td>
                      <td style={tdStyle}>
                        {typeof site.price_adult === "number"
                          ? site.price_adult.toFixed(2)
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Hotels & Rooms */}
            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
                Hotels & Rooms
              </h3>
              {item.rooms_detail.map((roomDetail: any, roomIndex: number) => (
                <div key={roomIndex} style={{ marginBottom: 16 }}>
                  <p style={{ fontWeight: 600, marginBottom: 4 }}>
                    {roomDetail.hotel.hotel_name} (
                    {roomDetail.hotel.hotel_rating})
                  </p>
                  <table style={tableStyle}>
                    <thead>
                      <tr>
                        <th style={thStyle}>Room</th>
                        <th style={thStyle}>Count</th>
                        <th style={thStyle}>Price (Double $)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {roomDetail.rooms.map((room: any) => (
                        <tr key={room.id}>
                          <td style={tdStyle}>{room.data.room_name}</td>
                          <td style={tdStyle}>{room.count}</td>
                          <td style={tdStyle}>
                            {Number(room.data.price_double).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>

            {/* Car Details */}
            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
                Car
              </h3>
              <table style={tableStyle}>
                <tbody>
                  <tr>
                    <td style={{ ...tdStyle, fontWeight: 600, width: 144 }}>
                      Model
                    </td>
                    <td style={tdStyle}>
                      {item.car.model} ({item.car.year})
                    </td>
                  </tr>
                  <tr>
                    <td style={{ ...tdStyle, fontWeight: 600 }}>
                      Seating Capacity
                    </td>
                    <td style={tdStyle}>{item.car.seating_capacity}</td>
                  </tr>
                  <tr>
                    <td style={{ ...tdStyle, fontWeight: 600 }}>
                      Daily Rate ($)
                    </td>
                    <td style={tdStyle}>
                      {Number(item.car.daily_rate).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Total Price */}
            <div style={totalPriceStyle}>
              <h3>Total Price: ${Number(item.total_price).toFixed(2)}</h3>
            </div>
          </section>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
          fontSize: 20,
          fontWeight: 600,
          color: "#1F2937",
          padding: "0 20px",
          textAlign: "center",
        }}
      >
        Your package has been successfully created. Please click Finish to
        download the PDF.
      </div>
    </>
  );
};

export default PackageSummary;
