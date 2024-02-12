//
//  MessLiveActivity.swift
//  MessLiveActivity
//
//  Created by Tim Lee on 2/10/24.
//

import WidgetKit
import SwiftUI

public struct TodoModel:Codable {
  let id: Int, title: String;
}

struct Provider: AppIntentTimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
      SimpleEntry(todos: [], date: Date(), configuration: ConfigurationAppIntent())
    }

    func snapshot(for configuration: ConfigurationAppIntent, in context: Context) async -> SimpleEntry {
      var todos : [TodoModel] = []
      todos = [
        TodoModel(id: 1, title: "할 일 목록1"),
        TodoModel(id: 2, title: "할 일 목록2"),
        TodoModel(id: 3, title: "할 일 목록3"),
        TodoModel(id: 4, title: "할 일 목록4"),
        TodoModel(id: 5, title: "할 일 목록5"),
        TodoModel(id: 6, title: "할 일 목록6"),
        TodoModel(id: 7, title: "할 일 목록7"),
      ]
      return SimpleEntry(todos: todos, date: Date(), configuration: configuration)
    }
  
    func timeline(for configuration: ConfigurationAppIntent, in context: Context) async -> Timeline<SimpleEntry> {
        var entries: [SimpleEntry] = []
      
        let userDefaults = UserDefaults(suiteName: "group.com.mass.project.widget")
        let jsonText = userDefaults?.string(forKey: "data")
      
        var todos : [TodoModel] = []

        do {
          if jsonText != nil {
            let jsonData = Data(jsonText?.utf8 ?? "".utf8)
            let valueData = try JSONDecoder().decode([TodoModel].self, from: jsonData)
            todos = valueData
          }
        } catch {
          print(error)
        }
      
        // Generate a timeline consisting of five entries an hour apart, starting from the current date.
        let currentDate = Date()
        for hourOffset in 0 ..< 5 {
            let entryDate = Calendar.current.date(byAdding: .minute, value: 5, to: currentDate)!
            let entry = SimpleEntry(todos: todos, date: entryDate, configuration: configuration)
            entries.append(entry)
        }
        return Timeline(entries: entries, policy: .atEnd)
    }
}

struct SimpleEntry: TimelineEntry {
    let todos: [TodoModel]
    let date: Date
    let configuration: ConfigurationAppIntent
}

struct MessLiveActivityEntryView : View {
    var entry: Provider.Entry
    @Environment(\.widgetFamily) private var widgetFamily

    var body: some View {
      switch widgetFamily {
        case .systemSmall:
          HStack(alignment: .top, spacing: nil, content: {
            VStack(alignment: .leading, spacing: 4, content: {
              ForEach(Array(zip(entry.todos.indices, entry.todos)), id: \.0) { index, item in
                if index < 5 {
                  Text("\(item.id). \(item.title)")
                    .frame(maxWidth: .infinity, alignment: .leading)
                  Divider()
//                    .font(Font.system(size: 14))
//                    .padding(2)
//                    .padding(.leading, 10)
//                    .background(Color(red: 249 / 255, green: 223 / 255, blue: 159 / 255))
//                    .cornerRadius(5)
                }
              }
            })
          })
        case .systemMedium:
          HStack(alignment: .top, spacing: nil, content: {
            VStack(alignment: .center, spacing: nil, content: {
              Text("⭐️ 할 일 목록 ⭐️").bold().padding(.bottom, 5)
              Text(entry.configuration.favoriteEmoji).font(Font.system(size: 70)).padding(.top, 5)
            })
            VStack(alignment: .leading, spacing: 4, content: {
              ForEach(Array(zip(entry.todos.indices, entry.todos)), id: \.0) { index, item in
                if index < 5 {
                  Text("\(item.id). \(item.title)")
                    .frame(maxWidth: .infinity, alignment: .leading)
                  Divider()
                }
              }
            })
          })
        case .systemLarge:
          HStack(alignment: .top, spacing: nil, content: {
            VStack(alignment: .center, spacing: nil, content: {
              Text("⭐️ 할 일 목록 ⭐️").bold().padding(.bottom, 5)
              Text(entry.configuration.favoriteEmoji).font(Font.system(size: 70)).padding(.top, 5)
            })
            VStack(alignment: .leading, spacing: 8, content: {
              ForEach(Array(zip(entry.todos.indices, entry.todos)), id: \.0) { index, item in
                if index < 9 {
                  Text("\(item.id). \(item.title)")
                    .frame(maxWidth: .infinity, alignment: .leading)
                  Divider()
                }
              }
            })
          })
          Spacer()
        @unknown default:
          fatalError()
      }
    }
}

struct MessLiveActivity: Widget {
    let kind: String = "MessLiveActivity"

    var body: some WidgetConfiguration {
        AppIntentConfiguration(kind: kind, intent: ConfigurationAppIntent.self, provider: Provider()) { entry in
            MessLiveActivityEntryView(entry: entry)
            .containerBackground(.fill.tertiary, for: .widget)
        }
    }
}

extension ConfigurationAppIntent {
    fileprivate static var smiley: ConfigurationAppIntent {
        let intent = ConfigurationAppIntent()
        intent.favoriteEmoji = "😀"
        return intent
    }
    
    fileprivate static var starEyes: ConfigurationAppIntent {
        let intent = ConfigurationAppIntent()
        intent.favoriteEmoji = "🤩"
        return intent
    }
}

#Preview(as: .systemSmall) {
    MessLiveActivity()
} timeline: {
    SimpleEntry(todos: [], date: .now, configuration: .smiley)
    SimpleEntry(todos: [], date: .now, configuration: .starEyes)
}
