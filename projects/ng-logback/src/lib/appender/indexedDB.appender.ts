import { Appender, ILoggingEvent } from "./appender";

/**
 * IndexedDB Appender.
 */
export class IndexedDBAppender implements Appender {
    constructor(
        private dbName: string,
        private storeName: string = this.constructor.name
    ) {
        const openRequest: IDBOpenDBRequest = indexedDB.open(this.dbName);
        openRequest.onupgradeneeded = (event: IDBVersionChangeEvent): void => {
            const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(this.storeName)) {
                db.createObjectStore(this.storeName, {
                    autoIncrement: true
                });
            }
        }
        openRequest.onerror = (): void => {
            console.error("Failed to open IndexedDB");
        }
    }

    public get name(): string {
        return this.storeName;
    }

    public doAppend(event: ILoggingEvent): void {
        if (!!event.level.priority) {
            const openRequest: IDBOpenDBRequest = indexedDB.open(this.constructor.name);
            openRequest.onsuccess = (e: Event): void => {
                const db: IDBDatabase = (e.target as IDBOpenDBRequest).result;
                const transaction: IDBTransaction = db.transaction(this.storeName, "readwrite");
                const store: IDBObjectStore = transaction.objectStore(this.storeName);
                store.put({ timestamp: event.timestamp.toLocaleString(), logger: event.logger, level: event.level.label, message: event.message });
                transaction.commit();
            }
            openRequest.onerror = (): void => {
                console.error("Failed to open IndexedDB");
            }
        }
    }
}
